/* seed.js  (node seed.js) */
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { sql } from "drizzle-orm";
import { products, stockIn, stockOut, suppliers } from "./schema.js";

import { config } from "dotenv";

config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

(async () => {
  try {
    /* 1. Products --------------------------------------------------- */
    const prods = await db
      .insert(products)
      .values([
        { name: "Sosis Sapi Premium", stock: 120 },
        { name: "Sosis Ayam Original", stock: 90 },
        { name: "Bakso Sapi Medium", stock: 200 },
        { name: "Bakso Ayam King", stock: 150 },
        { name: "Nugget Ayam Crispy", stock: 300 },
        { name: "Daging Sapi Slice 250g", stock: 85 },
        { name: "Chicken Fillet Block", stock: 160 },
        { name: "French Fries 1kg", stock: 500 },
      ])
      .returning();

    /* 2. Suppliers -------------------------------------------------- */
    const sups = await db
      .insert(suppliers)
      .values([
        {
          name: "PT ColdChain Jakarta",
          address: "Jl. Kuningan No. 10",
          phoneNumber: "021-111-2222",
        },
        {
          name: "CV Frozen Delight",
          address: "Jl. Sudirman No. 55",
          phoneNumber: "022-333-4444",
        },
        {
          name: "UD Arctic Logistic",
          address: "Jl. Pelabuhan No.  8",
          phoneNumber: "031-555-6666",
        },
      ])
      .returning();

    /* 3. Helper arrays for random pick ------------------------------ */
    const randomDate = (start, end) =>
      new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    /* 4. 25 stock-in rows ------------------------------------------ */
    const inRows = Array.from({ length: 25 }).map(() => ({
      productId: pick(prods).id,
      suppliersId: pick(sups).id,
      quantity: Math.floor(Math.random() * 100) + 10,
      createdAt: randomDate(new Date("2024-01-01"), new Date("2024-06-30")),
    }));
    await db.insert(stockIn).values(inRows);

    /* 5. 25 stock-out rows ----------------------------------------- */
    const outRows = Array.from({ length: 25 }).map(() => ({
      productId: pick(prods).id,
      quantity: Math.floor(Math.random() * 80) + 5,
      destination: pick(["Toko A", "Toko B", "Restoran XYZ", "Hotel Q"]),
      status: pick(["Pending", "Approved", "Rejected"]),
      createdAt: randomDate(new Date("2024-01-01"), new Date("2024-06-30")),
    }));
    await db.insert(stockOut).values(outRows);

    console.log("✅ 50 rows inserted");
  } catch (err) {
    console.error("❌ Seed error", err);
  } finally {
    await pool.end();
  }
})();
