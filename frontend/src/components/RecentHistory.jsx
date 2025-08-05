// @ts-check

import React, { useState } from "react";
import { ToggleHistory } from "./ToggleHistory";
import TableHistory from "./TableHistory";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const RecentHistory = ({
  stockIn = [],
  stockOut = [],
  products = [],
  suppliers = [],
}) => {
  const [data, setData] = useState("stockIn");

  const rows = data === "stockIn" ? stockIn.slice(0, 5) : stockOut.slice(0, 5);

  return (
    <Card
      className={`w-full bg-gray-800/60 backdrop-blur border border-gray-700/40 rounded-xl shadow-lg`}
    >
      <CardHeader>
        <CardTitle className="text-gray-100 font-heading font-semibold">
          Recent History
        </CardTitle>
        <CardDescription className="text-gray-400">
          View the latest stock movements in and out of your warehouse.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="mt-4">
            <ToggleHistory value={data} onValueChange={setData} />
          </div>
          <TableHistory
            type={data}
            rows={rows}
            products={products}
            suppliers={suppliers}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentHistory;
