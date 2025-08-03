// @ts-check

import { db } from "../database/db.js";
import { products } from "../database/schema.js";
import { eq } from "drizzle-orm";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await db.select().from(products);

    return res.status(200).json({
      success: true,
      data: allProducts,
      message: "Data All Products",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Data Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: "Product retrieved successfully",
    });
  } catch (error) {
    console.log("Error Fetching Data Product");
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const addProduct = async (req, res) => {
  const { name, stock } = req.body;

  try {
    const newProduct = await db
      .insert(products)
      .values({ name, stock })
      .returning();

    console.log("Add Product: ", newProduct);

    return res.status(200).json({
      success: true,
      data: newProduct,
      message: "Success Add Product",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  const { name, stock } = req.body;
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Id Product Not Found",
      });
    }

    const oldDataProduct = await db
      .update(products)
      .set({ name, stock, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

    return res.status(200).json({
      success: true,
      data: oldDataProduct,
      message: "Success Update Product :)",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await db.delete(products).where(eq(products.id, id));

    return res.status(200).json({
      success: true,
      message: "Successfully Delete Product",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
