// @ts-check

import { db } from "../database/db.js";
import { suppliers } from "../database/schema.js";
import { eq } from "drizzle-orm";

export const getAllSuppliers = async (req, res) => {
  try {
    const allSuppliers = await db.select().from(suppliers);

    return res.status(200).json({
      success: true,
      data: allSuppliers,
      message: "All Suppliers",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await db
      .select()
      .from(suppliers)
      .where(eq(suppliers.id, id))
      .limit(1);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Data Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: supplier,
      message: "Supplier retrieved successfully",
    });
  } catch (error) {}
};

export const addSupplier = async (req, res) => {
  const { name, address, phoneNumber } = req.body;

  try {
    const newSupplier = await db
      .insert(suppliers)
      .values({
        name,
        address,
        phoneNumber,
      })
      .returning();

    return res.status(200).json({
      success: true,
      data: newSupplier,
      message: "Success Add Supplier",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, address } = req.body;

  try {
    const oldDataSupplier = await db
      .update(suppliers)
      .set({
        name,
        address,
        phoneNumber,
      })
      .where(eq(suppliers.id, id))
      .returning();

    return res.status(200).json({
      success: true,
      data: oldDataSupplier,
      message: "Success Update Suplier ;)",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    await db.delete(suppliers).where(eq(suppliers.id, id));

    return res.status(200).json({
      success: true,
      message: "Successfully Delete Supplier",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
