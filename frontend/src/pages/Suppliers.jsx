// @ts-check

import TableSupplier from "@/components/TableSupplier";
import { suppliers } from "@/lib/constant";
import React from "react";

const Suppliers = () => {
  return (
    <div className="p-6 space-y-2">
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-white">
          Suppliers Hub
        </h1>

        <p className="font-sans text-base text-gray-300">
          View, add, and manage every vendor in one place.
        </p>

        <p className="font-sans text-sm text-gray-400">
          Keep your supply chain transparent—see contact details, latest
          deliveries, and on-time performance at a glance.
        </p>
      </div>
      <div className="py-10 space-y-4 flex flex-col gap-3">
        <TableSupplier rows={suppliers} />
      </div>
    </div>
  );
};

export default Suppliers;
