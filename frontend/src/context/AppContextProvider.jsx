import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { api } from "@/lib/apiClient";

// AppContextProvider.js
export const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [stockIn, setStockIn] = useState([]);
  const [stockOut, setStockOut] = useState([]);
  const [summaryStock, setSummaryStock] = useState([]);

  // Product
  const fetchProducts = async () => {
    const res = await api.get("/all-product");
    setProducts(res.data.data);
  };

  const addProductDB = async (newData) => {
    try {
      await api.post("/product", newData);
      await fetchProducts();
    } catch (error) {
      console.error("Gagal menambah product", error);
    }
  };

  const updateProductDB = async (updateData) => {
    try {
      await api.patch(`/product/${updateData.id}`, updateData);
      await fetchProducts();
    } catch (error) {
      console.error("Gagal update product", error);
    }
  };

  const deleteProductDB = async (deleteData) => {
    try {
      await api.delete(`/product/${deleteData}`);
      await fetchProducts();
    } catch (error) {
      console.error("Gagal delete product", error);
    }
  };

  // Stock In
  const addStockInDB = async (newData) => {
    try {
      await api.post("/stock-in", newData);
      await fetchStockIn();
    } catch (error) {
      console.error("Gagal menambah stock in", error);
    }
  };

  const updateStockInDB = async (updateData) => {
    try {
      await api.patch(`/stock-in/${updateData.id}`, updateData);
      await fetchStockIn();
    } catch (error) {
      console.error("Gagal update stock in", error);
    }
  };

  const fetchStockIn = async () => {
    const res = await api.get("/all-stock-in");
    setStockIn(res.data.data);
  };

  // Supplier
  const fetchSuppliers = async () => {
    const res = await api.get("/all-supplier");
    setSuppliers(res.data.data);
  };

  // Stock Out
  const fetchStockOut = async () => {
    const res = await api.get("/all-stock-out");
    setStockOut(res.data.data);
  };

  const addStockOutDB = async (newData) => {
    try {
      await api.post("/stock-out", newData);
      await fetchStockOut();
    } catch (error) {
      console.error("Gagal menambah stock out", error);
    }
  };

  const updateStockOutDB = async (updateData) => {
    try {
      await api.patch(`/stock-out/${updateData.id}`, updateData);
      await fetchStockOut();
    } catch (error) {
      console.error("Gagal update stock out", error);
    }
  };

  // Summary
  const fetchSummaryStock = async () => {
    const res = await api.get("/summary-stock");
    setSummaryStock(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
    fetchStockIn();
    fetchStockOut();
    fetchSummaryStock();
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        suppliers,
        stockIn,
        stockOut,
        summaryStock,
        fetchProducts,
        fetchSuppliers,
        fetchStockIn,
        fetchStockOut,
        fetchSummaryStock,
        addProductDB,
        addStockInDB,
        addStockOutDB,
        updateProductDB,
        updateStockInDB,
        updateStockOutDB,
        deleteProductDB,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
