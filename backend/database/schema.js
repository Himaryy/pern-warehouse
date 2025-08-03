// @ts-check

import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const stockOutStatusEnum = pgEnum("status", [
  "Pending",
  "Approved",
  "Rejected",
]);

// Produk
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  stock: integer("stock").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Suppliers
export const suppliers = pgTable("suppliers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 15 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// stock in dan stock out
export const stockIn = pgTable("stock_in", {
  id: uuid("id").defaultRandom().primaryKey(),
  quantity: integer("quantity").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),

  // Relasi ke produk
  productId: uuid("product_id").references(() => products.id),
  // Relasi ke supplier
  suppliersId: uuid("suppliers_id").references(() => suppliers.id),
});

export const stockOut = pgTable("stock_out", {
  id: uuid("id").defaultRandom().primaryKey(),
  quantity: integer("quantity").notNull().default(0),
  destination: varchar("destination", { length: 100 }).notNull(),
  status: stockOutStatusEnum("status").default("Pending").notNull(),
  createdAt: timestamp("created_at").defaultNow(),

  // Relasi ke produk
  productId: uuid("product_id").references(() => products.id),
});
