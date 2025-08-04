// @ts-check

import { AddStockIn } from "@/components/StockActions";
import TableHistory from "@/components/TableHistory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { products, stockIn } from "@/lib/constant";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

const StockIn = () => {
  const [productFilter, setProductFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const query = productFilter.toLowerCase();
  const filteredData = stockIn.filter((r) => {
    const product = products.find((p) => p.id === r.productId);
    return (
      !query ||
      product?.id.toLowerCase().includes(query) ||
      product?.name.toLowerCase().includes(query)
    );
  });
  return (
    <div className="p-6 space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">
            Stock-In Records
          </h1>
          <p className="mt-1 font-sans text-sm text-gray-400">
            Track every incoming shipment in real time
          </p>
        </div>
        <AddStockIn />
      </div>

      <Card
        className={`w-full bg-gray-800/60 backdrop-blur border border-gray-700/40 rounded-xl shadow-lg`}
      >
        <CardHeader>
          <CardTitle className="text-gray-100 font-heading font-semibold">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">Search By</span>
              </div>

              <Input
                placeholder="Product ID / Name"
                className={`w-48 bg-gray-800/50 border-gray-700 text-white`}
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2">
            <TableHistory type="stockIn" rows={filteredData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockIn;
