// @ts-check
import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { api } from "@/lib/apiClient";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

// AppContextProvider.js
export const AppContextProvider = ({ children }) => {
  const [productsContext, setProductsContext] = useState([]);
  const [suppliersContext, setSuppliersContext] = useState([]);
  const [stockInContext, setStockInContext] = useState([]);
  const [stockOutContext, setStockOutContext] = useState([]);
  const [summaryStockContext, setSummaryStockContext] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const [currentPath, setCurrentPath] = useState(location.pathname);

  const isActive = (path) => currentPath === path;

  const navigateTo = (path) => {
    // setCurrentPath(path);
    navigate(path);
  };

  // Product
  const fetchProducts = async () => {
    const res = await api.get("/all-product");
    setProductsContext(res.data.data);
  };

  const addProductDB = async (newData) => {
    try {
      await api.post("/product", newData);

      toast.success("Success", {
        description: "Berhasil menambahkan produk",
        richColors: true,
        style: {
          backgroundColor: "#065f46",
          color: "#E5E7EB",
          border: "1px solid #064e3b",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      });
      await fetchProducts();
    } catch (error) {
      toast.error("Error", {
        description: "An error occured, please try again ",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  const updateProductDB = async (updateData) => {
    try {
      await api.patch(`/product/${updateData.id}`, updateData);

      toast.success("Success", {
        description: "Berhasil update produk",
        richColors: true,
        style: {
          backgroundColor: "#065f46",
          color: "#E5E7EB",
          border: "1px solid #064e3b",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      });

      await fetchProducts();
    } catch (error) {
      toast.error("Error", {
        description: "An error occured, please try again ",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  const deleteProductDB = async (deleteData) => {
    try {
      await api.delete(`/product/${deleteData}`);

      toast.success("Success", {
        description: "Berhasil menghapus produk",
        richColors: true,
        style: {
          backgroundColor: "#065f46",
          color: "#E5E7EB",
          border: "1px solid #064e3b",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      });

      await fetchProducts();
    } catch (error) {
      toast.error("Error", {
        description: `Gagal menghapus karena terhubung dengan data lain`,
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  // Stock In
  const addStockInDB = async (newData) => {
    try {
      await api.post("/stock-in", newData);

      toast.success("Success", {
        description: "Berhasil menambah stock produk",
        richColors: true,
        style: {
          backgroundColor: "#065f46",
          color: "#E5E7EB",
          border: "1px solid #064e3b",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      });

      await fetchStockIn();
    } catch (error) {
      toast.error("Error", {
        description: "Gagal menambah stock produk",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  const updateStockInDB = async (updateData) => {
    try {
      await api.patch(`/stock-in/${updateData.id}`, updateData);

      toast.success("Success", {
        description: "Berhasil update stock produk",
        richColors: true,
        style: {
          backgroundColor: "#065f46",
          color: "#E5E7EB",
          border: "1px solid #064e3b",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      });

      await fetchStockIn();
    } catch (error) {
      toast.error("Error", {
        description: "Gagal update stock produk",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  const fetchStockIn = async () => {
    try {
      const res = await api.get("/all-stock-in");

      setStockInContext(res.data.data);
    } catch (error) {
      toast.error("Error", {
        description: "An error occured, please try again ",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  // Supplier
  const fetchSuppliers = async () => {
    try {
      const res = await api.get("/all-supplier");
      setSuppliersContext(res.data.data);
    } catch (error) {
      toast.error("Error", {
        description: "An error occured, please try again ",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  const addSupplierDB = async (newData) => {
    try {
      await api.post("/supplier", newData);

      toast.success("Success", {
        description: "Berhasil menambahkan data supplier",
        richColors: true,
        style: {
          backgroundColor: "#065f46",
          color: "#E5E7EB",
          border: "1px solid #064e3b",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      });

      await fetchSuppliers();
    } catch (error) {
      toast.error("Error", {
        description: "Gagal menambah data supplier ",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  const updateSupplierDB = async (updateData) => {
    try {
      await api.patch(`/supplier/${updateData.id}`, updateData);

      toast.success("Success", {
        description: "Berhasil update data supplier",
        richColors: true,
        style: {
          backgroundColor: "#065f46",
          color: "#E5E7EB",
          border: "1px solid #064e3b",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      });

      await fetchSuppliers();
    } catch (error) {
      toast.error("Error", {
        description: "Gagal update data supplier ",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  const deleteSupplierDB = async (deleteData) => {
    try {
      await api.delete(`/supplier/${deleteData}`);

      toast.success("Success", {
        description: "Berhasil menghapus data supplier",
        richColors: true,
        style: {
          backgroundColor: "#065f46",
          color: "#E5E7EB",
          border: "1px solid #064e3b",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      });
      await fetchSuppliers();
    } catch (error) {
      toast.error("Error", {
        description: "Gagal menghapus data supplier",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  // Stock Out
  const fetchStockOut = async () => {
    try {
      const res = await api.get("/all-stock-out");
      setStockOutContext(res.data.data);
    } catch (error) {
      toast.error("Error", {
        description: "An error occured, please try again ",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  const addStockOutDB = async (newData) => {
    try {
      await api.post("/stock-out", newData);

      toast.success("Success", {
        description: "Berhasil membuat permintaan produk",
        richColors: true,
        style: {
          backgroundColor: "#065f46",
          color: "#E5E7EB",
          border: "1px solid #064e3b",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      });
      await fetchStockOut();
    } catch (error) {
      toast.error("Error", {
        description: "Gagal membuat permintaan produk",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  const updateStockOutDB = async (updateData) => {
    try {
      await api.patch(`/stock-out/${updateData.id}`, updateData);

      toast.success("Success", {
        description: "Berhasil update pemintaan produk",
        richColors: true,
        style: {
          backgroundColor: "#065f46",
          color: "#E5E7EB",
          border: "1px solid #064e3b",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
      });
      await fetchStockOut();
    } catch (error) {
      toast.error("Error", {
        description: "Gagal update permintaan produk",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  // Summary
  const fetchSummaryStock = async () => {
    try {
      const res = await api.get("/summary-stock");
      setSummaryStockContext(res.data.data);
    } catch (error) {
      toast.error("Error", {
        description: "An error occured, please try again ",
        richColors: true,
        style: {
          backgroundColor: "#EF4444",
          color: "#F9FAFB",
          border: "1px solid #7F1D1D",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        },
      });
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
    fetchStockIn();
    fetchStockOut();
    fetchSummaryStock();
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <AppContext.Provider
      value={{
        // State Array
        productsContext,
        suppliersContext,
        stockInContext,
        stockOutContext,
        summaryStockContext,
        // Fetch All Data
        fetchProducts,
        fetchSuppliers,
        fetchStockIn,
        fetchStockOut,
        fetchSummaryStock,
        // Add data to db
        addProductDB,
        addStockInDB,
        addStockOutDB,
        addSupplierDB,
        // update data to db
        updateProductDB,
        updateStockInDB,
        updateStockOutDB,
        updateSupplierDB,
        // delete data
        deleteProductDB,
        deleteSupplierDB,
        // Location
        currentPath,
        isActive,
        navigateTo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
