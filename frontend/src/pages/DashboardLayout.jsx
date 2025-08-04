import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
