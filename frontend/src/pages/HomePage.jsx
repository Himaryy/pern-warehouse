// @ts-check

import CardInformation from "@/components/CardInformation";
import ChartInformation from "@/components/ChartInformation";
import RecentHistory from "@/components/RecentHistory";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";

const HomePage = () => {
  const {
    productsContext = [],
    stockInContext = [],
    stockOutContext = [],
    suppliersContext = [],
    summaryStockContext = [],
  } = useContext(AppContext);

  if (
    !productsContext ||
    !stockInContext ||
    !stockOutContext ||
    !suppliersContext ||
    !summaryStockContext
  )
    return null;
  return (
    <div className="p-6 space-y-2">
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-white">
          Reporting Overview
        </h1>

        <p className="font-sans text-base text-gray-300">
          Welcome to{" "}
          <span className="font-heading font-semibold text-green-400">
            StockMaster
          </span>
          &nbsp;— your real-time warehouse companion.
        </p>

        <p className="font-sans text-sm text-gray-400">
          Track inventory, manage stock-in/out, and surface instant analytics.
        </p>
      </div>
      <div className="py-10 space-y-4 flex flex-col gap-3">
        <CardInformation
          totalProducts={productsContext.length}
          totalStockIn={stockInContext.length}
          totalStockOut={stockOutContext.length}
          totalSuppliers={suppliersContext.length}
        />
        <ChartInformation data={summaryStockContext} />
        {/* <ChartInformation /> */}
        <RecentHistory
          stockIn={stockInContext}
          stockOut={stockOutContext}
          products={productsContext}
          suppliers={suppliersContext}
        />
      </div>
    </div>
  );
};

export default HomePage;
