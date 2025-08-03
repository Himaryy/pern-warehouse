// @ts-check
import {
  addStockIn,
  getAllStockIn,
  updateStockIn,
} from "../controller/stockIn.controller.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controller/products.controller.js";
import express from "express";
import {
  addSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplier,
  updateSupplier,
} from "../controller/suppliers.controller.js";
import {
  addStockOut,
  approveStockOut,
  getAllStockOut,
  getStockOut,
  updateStockOut,
} from "../controller/stockOut.controller.js";

const productRouter = express.Router();

// Product
productRouter.post("/product", addProduct);
productRouter.patch("/product/:id", updateProduct);
productRouter.delete("/product/:id", deleteProduct);
productRouter.get("/product", getProduct);
productRouter.get("/all-product", getAllProducts);

// Stock In and Out
productRouter.post("/stock-in", addStockIn);
productRouter.patch("/stock-in/:id", updateStockIn);
productRouter.get("/all-stock-in", getAllStockIn);

productRouter.get("/all-stock-out", getAllStockOut);
productRouter.get("/stock-out/:id", getStockOut);
productRouter.post("/stock-out", addStockOut);
productRouter.patch("/stock-out/:id", updateStockOut);
productRouter.patch("/stock-out/:id/approve", approveStockOut);

// Supplier
productRouter.post("/supplier", addSupplier);
productRouter.patch("/supplier/:id", updateSupplier);
productRouter.delete("/supplier/:id", deleteSupplier);
productRouter.get("/supplier/:id", getSupplier);
productRouter.get("/all-supplier", getAllSuppliers);
export default productRouter;
