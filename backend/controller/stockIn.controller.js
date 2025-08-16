// @ts-check

import { db } from "../database/db.js";
import { products, stockIn } from "../database/schema.js";
import { desc, eq, sql } from "drizzle-orm";

export const getAllStockIn = async (req, res) => {
  try {
    const allStockIn = await db
      .select()
      .from(stockIn)
      .orderBy(desc(stockIn.createdAt));

    return res.status(200).json({
      success: true,
      data: allStockIn,
      message: "Data All Stock In",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const addStockIn = async (req, res) => {
  const { productId, quantity, suppliersId } = req.body;

  try {
    const result = await db.transaction(async (trx) => {
      const [dataStockIn] = await trx
        .insert(stockIn)
        .values({ productId, quantity, suppliersId })
        .returning();

      // Update stock product nya kalo ada barang masuk
      await trx
        .update(products)
        .set({ stock: sql`${products.stock} + ${quantity}` })
        .where(eq(products.id, productId));

      return dataStockIn;
    });

    return res.status(200).json({
      success: true,
      data: result,
      message: "Stock in recorded and stock product updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStockIn = async (req, res) => {
  const { id } = req.params;
  const { quantity, suppliersId, productId } = req.body;

  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Id Product Not Found",
    });
  }
  try {
    const updateStock = db.transaction(async (trx) => {
      // Get old Data
      const [oldData] = await trx
        .select({
          productId: stockIn.productId,
          quantity: stockIn.quantity,
          suppliersId: stockIn.suppliersId,
        })
        .from(stockIn)
        .where(eq(stockIn.id, id))
        .limit(1);

      if (!oldData) {
        throw new Error("Record stock In not found");
      }

      const {
        productId: oldProductId,
        quantity: oldQuantity,
        suppliersId: oldSuppliersId,
      } = oldData;

      // Calculate Qty
      const diffQty = (quantity ?? oldQuantity) - oldQuantity; // will 0 if no changes

      // if Quantity changes
      if (diffQty !== 0 || productId !== oldProductId) {
        // Decrease old stock
        if (oldProductId) {
          await trx
            .update(products)
            .set({ stock: sql`${products.stock} - ${oldQuantity}` })
            .where(eq(products.id, oldProductId));
        }

        // increase new stock
        if (productId) {
          await trx
            .update(products)
            .set({ stock: sql`${products.stock} + ${quantity ?? oldQuantity}` })
            .where(eq(products.id, productId));
        }

        // Update data stock in
      }
      const latestUpdate = {};
      if (productId !== undefined) latestUpdate.productId = productId;
      if (quantity !== undefined) latestUpdate.quantity = quantity;
      if (suppliersId !== undefined) latestUpdate.suppliersId = suppliersId;

      const [updatedData] = await trx
        .update(stockIn)
        .set(latestUpdate)
        .where(eq(stockIn.id, id))
        .returning();

      return updatedData;
    });
    return res.status(200).json({
      success: true,
      message: "Data successfully updated",
      data: updateStock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
