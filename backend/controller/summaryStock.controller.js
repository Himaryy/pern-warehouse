// @ts-check

import { db } from "../database/db.js";
import { stockIn, stockOut } from "../database/schema.js";
import { sql, sum } from "drizzle-orm";

export const SummaryStock = async (req, res) => {
  try {
    const summaryStockIn = await db
      .select({
        month: sql`to_char(${stockOut.createdAt}, 'Month')`.as("month"),
        sumStockIn: sum(stockIn.quantity).as("sumStockIn"),
      })
      .from(stockIn)
      .groupBy(sql`month`)
      .orderBy(sql`month`);

    const summaryStockOut = await db
      .select({
        month: sql`to_char(${stockOut.createdAt}, 'Month')`.as("month"),
        stockOut: sum(stockOut.quantity).as("sumStockOut"),
      })
      .from(stockOut)
      .groupBy(sql`month`)
      .orderBy(sql`month`);

    const mergeStockSummary = new Map();
    for (const mergeStock of summaryStockIn)
      mergeStockSummary.set(mergeStock.month, {
        month: mergeStock.month,
        stockIn: Number(mergeStock.sumStockIn),
        stockOut: 0,
      });

    for (const mergeStock of summaryStockOut) {
      if (!mergeStockSummary.has(mergeStock.month))
        mergeStockSummary.set(mergeStock, {
          month: mergeStock.month,
          stockIn: 0,
          stockOut: 0,
        });
      mergeStockSummary.get(mergeStock.month).stockOut = Number(
        mergeStock.stockOut
      );
    }
    const result = Array.from(mergeStockSummary.values()).sort((a, b) =>
      a.month.localeCompare(b.month)
    );

    return res.status(200).json({
      success: true,
      data: result,
      message: "Successfully retrieved merge stock in month",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
