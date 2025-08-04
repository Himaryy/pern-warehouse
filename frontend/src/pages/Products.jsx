// @ts-check
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TableProduct from "@/components/TableProduct";
import { products } from "@/lib/constant";

const Products = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-white">
          Product Catalog
        </h1>
        <p className="font-sans text-base text-gray-300">
          Browse, add, and update every SKU in your warehouse.
        </p>
        <p className="font-sans text-sm text-gray-400">
          Real-time stock levels, low-stock alerts, and quick-edit actions in
          one screen.
        </p>
      </div>

      {/* Placeholder for product table/grid */}
      <div className="py-4">
        <TableProduct rows={products} />
      </div>
    </div>
  );
};

export default Products;
