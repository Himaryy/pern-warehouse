// @ts-check

import { db } from "../database/db.js";
import { products, stockOut } from "../database/schema.js";
import { eq, sql } from "drizzle-orm";

export const getAllStockOut = async (req, res) => {
  try {
    const allStockOut = await db
      .select({
        stockOutId: stockOut.id,
        productId: stockOut.productId,
        productName: products.name,
        quantity: stockOut.quantity,
        destination: stockOut.destination,
        status: stockOut.status,
        createdAt: stockOut.createdAt,
      })
      .from(stockOut)
      .innerJoin(products, eq(stockOut.productId, products.id));

    console.log("Stock Out: ", allStockOut);

    return res.status(200).json({
      success: true,
      data: allStockOut,
      message: "Get All Stock Out Successfully",
    });
  } catch (error) {
    console.error("Error fetching stock out:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getStockOut = async (req, res) => {
  const { id } = req.params;

  try {
    const stockOutProduct = await db
      .select()
      .from(stockOut)
      .where(eq(stockOut.id, id))
      .innerJoin(products, eq(stockOut.productId, products.id))
      .limit(1);

    if (!stockOutProduct) {
      return res.status(404).json({
        success: false,
        message: "Data Stock Out Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: stockOutProduct,
      message: "Data Stock Out Product retrieved succesfully",
    });
  } catch (error) {
    console.log("Error Fetching Data Stock Out");
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const addStockOut = async (req, res) => {
  const { quantity, destination, productId } = req.body;

  if (!productId || !quantity || quantity <= 0 || !destination.trim()) {
    return res.status(400).json({
      success: false,
      message: "Invalid input detected",
    });
  }

  try {
    const newStockOut = await db.transaction(async (trx) => {
      const [product] = await trx
        .select({ stock: products.stock })
        .from(products)
        .where(eq(products.id, productId))
        .for("update");

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product not found",
        });
      }
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      // await trx
      //   .update(products)
      //   .set({ stock: product.stock - quantity })
      //   .where(eq(products.id, productId));

      const [insertedDataStockOut] = await trx
        .insert(stockOut)
        .values({ productId, quantity, destination, createdAt: new Date() })
        .returning();

      return insertedDataStockOut;
    });

    return res.status(200).json({
      success: true,
      message: "Stock out Retrieved",
      data: newStockOut,
    });
  } catch (error) {
    console.log("Error Fetching Data Product");
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const updateStockOut = async (req, res) => {
  const { id } = req.params;
  const { quantity, destination, status, productId } = req.body;

  try {
    const [oldDataStockOut] = await db
      .select()
      .from(stockOut)
      .where(eq(stockOut.id, id));

    if (!oldDataStockOut) {
      return res.status(404).json({
        success: false,
        message: "Data Stock Out Not Found",
      });
    }

    if (oldDataStockOut.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot Update, already approved or rejected",
      });
    }

    const [updatedData] = await db
      .update(stockOut)
      .set({
        ...(quantity !== undefined && { quantity }),
        ...(destination && { destination }),
        ...(status && status === "Pending" && { status }),
        ...(productId && { productId }),
      })
      .where(eq(stockOut.id, id))
      .returning();

    return res.status(200).json({
      success: true,
      data: updatedData,
      message: "Data Stock Out Updated",
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const approveStockOut = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.transaction(async (trx) => {
      const [dataStockOut] = await trx
        .select()
        .from(stockOut)
        .where(eq(stockOut.id, id))
        .for("update");

      if (!dataStockOut) {
        return res.status(404).json({
          success: false,
          message: "Data Stock out not found",
        });
      }

      if (dataStockOut.status !== "Pending") {
        return res.status(400).json({
          success: false,
          message: "This product already process",
        });
      }

      const [product] = await trx
        .select({ id: products.id, name: products.name, stock: products.stock })
        .from(products)
        .where(eq(products.id, dataStockOut.productId))
        .for("update");

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (product.stock < dataStockOut.quantity) {
        return res.status(400).json({
          succes: false,
          message: "Insufficient stock",
        });
      }

      const newStock = product.stock - dataStockOut.quantity;

      await trx
        .update(products)
        .set({ stock: newStock })
        .where(eq(products.id, product.id));

      const [updated] = await trx
        .update(stockOut)
        .set({ status: "Approved" })
        .where(eq(stockOut.id, id))
        .returning({
          stockOutId: stockOut.id,

          productId: stockOut.productId,
          // productName: products.name,
          quantity: stockOut.quantity,
          destination: stockOut.destination,
          status: stockOut.status,
          createdAt: stockOut.createdAt,
        });

      const finalDataStockOut = {
        ...updated,
        productName: product.name,
        newStock,
      };

      return finalDataStockOut;
    });

    return res.status(200).json({
      success: true,
      message: "Stock out approved and stock reduced",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
