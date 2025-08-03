// @ts-check

import { config } from "dotenv";

config();

export default {
  schema: "./database/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
