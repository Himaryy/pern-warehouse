import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { api } from "@/lib/apiClient";

export const AppContextProvider = (props) => {
  const [products, setProducts] = useState(null);
  const [stockIn, setStockIn] = useState(null);
  const [stockOut, setStockOut] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [summaryStock, setSummaryStock] = useState(null);

  // Fetch Data
  useEffect(() => {
    Promise.all([
      api.get("/all-product").then((res) => setProducts(res.data.data)),
      api.get("/all-stock-in").then((res) => setStockIn(res.data.data)),
      api.get("/all-stock-out").then((res) => setStockOut(res.data.data)),
      api.get("/all-supplier").then((res) => setSuppliers(res.data.data)),
      api.get("/summary-stock").then((res) => setSummaryStock(res.data.data)),
    ]);
  }, []);

  const value = {
    products,
    suppliers,
    stockIn,
    stockOut,
    summaryStock,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
