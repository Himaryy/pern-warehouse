// @ts-check

import { db } from "../database/db.js";
import { products, stockIn } from "../database/schema.js";
import { eq, sql } from "drizzle-orm";

export const getAllStockIn = async (req, res) => {
  try {
    const allStockIn = await db.select().from(stockIn);

    return res.status(200).json({
      success: true,
      data: allStockIn,
      message: "Data All Stock In",
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStockIn = async (req, res) => {
  const { id } = req.params;
  const { quantity, suppliersId } = req.body;

  try {
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Id Product Not Found",
      });
    }

    const updateStock = await db
      .update(stockIn)
      .set({ quantity, suppliersId })
      .where(eq(stockIn.id, id))
      .returning();

    if (updateStock.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid Stock Data",
      });
    }

    return res.status(200).json({
      success: true,
      data: updateStock,
      message: "Success Update Stock :)",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
