// @ts-check
import { db } from "../database/db.js";
import { stockIn, stockOut } from "../database/schema.js";
import { sql, sum } from "drizzle-orm";

export const SummaryStock = async (req, res) => {
  try {
    // stock-in
    const summaryStockIn = await db
      .select({
        month: sql`to_char(${stockIn.createdAt}, 'Mon-YYYY')`.as("month"),
        stockIn: sql`sum(${stockIn.quantity})`.as("stockIn"),
        stockOut: sql`0`.as("stockOut"),
      })
      .from(stockIn)
      .groupBy(sql`month`)
      .orderBy(sql`month`);

    // stock-out
    const summaryStockOut = await db
      .select({
        month: sql`to_char(${stockOut.createdAt}, 'Mon-YYYY')`.as("month"),
        stockIn: sql`0`.as("stockIn"),
        stockOut: sql`sum(${stockOut.quantity})`.as("stockOut"),
      })
      .from(stockOut)
      .groupBy(sql`month`)
      .orderBy(sql`month`);

    // merge
    const map = new Map();
    [...summaryStockIn, ...summaryStockOut].forEach((r) => {
      const key = r.month;
      if (!map.has(key)) map.set(key, { month: key, stockIn: 0, stockOut: 0 });
      map.get(key).stockIn += Number(r.stockIn);
      map.get(key).stockOut += Number(r.stockOut);
    });

    const result = Array.from(map.values()).sort(
      (a, b) => a.month.localeCompare(b.month) // "Jan-2024" vs "Feb-2024" sudah urut
    );

    return res.status(200).json({
      success: true,
      data: result,
      message: "Successfully retrieved merge stock in month",
    });
  } catch (error) {
    console.error("SummaryStock error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
