import React from "react";
import { Button } from "./components/ui/button";
import Sidebar from "./components/Sidebar";
import { Outlet, Route, Routes } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Suppliers from "./pages/Suppliers";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock-in" element={<StockIn />} />
          <Route path="/stock-out" element={<StockOut />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
