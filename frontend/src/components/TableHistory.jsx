import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { products, stockIn, stockOut, suppliers } from "@/lib/constant";
import { DeleteStockIn, EditStockIn } from "./StockActions";

const TableHistory = ({ rows, type }) => {
  return (
    <div>
      <Table>
        <TableCaption>
          {type === "stockIn"
            ? "Recent stock-in records"
            : "Recent stock-out records"}
        </TableCaption>
        <TableHeader>
          <TableRow className={`hover:bg-gray-500/30`}>
            <TableHead className="w-12 shrink-0 text-sm text-white">
              No
            </TableHead>
            <TableHead className="w-10 text-center text-sm text-white">
              Product
            </TableHead>
            <TableHead className="w-20 shrink-0 text-center text-sm text-white">
              Qty
            </TableHead>
            {/* If the toggle is Stock In the value on destination is "-" */}
            {/* If the toggle is Stock Out the value on supplier is "-" */}
            {type === "stockIn" ? (
              <TableHead
                className={`w-20 shrink-0 text-center text-sm text-white`}
              >
                Supplier
              </TableHead>
            ) : (
              <TableHead
                className={`w-40 shrink-0 text-center text-sm text-white`}
              >
                Destination
              </TableHead>
            )}

            {type === "stockOut" && (
              <TableHead
                className={`w-28 shrink-0 text-center text-sm text-white`}
              >
                Status
              </TableHead>
            )}

            <TableHead
              className={`w-32 shrink-0 text-center text-sm text-white`}
            >
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => {
            const product = products.find((p) => p.id === row.productId);
            const supplier =
              type === "stockIn"
                ? suppliers.find((s) => s.id === row.suppliersId)?.name ?? "-"
                : "-";
            const destination = type === "stockOut" ? row.destination : "-";
            const status = type === "stockOut" ? row.status : "-";

            return (
              <TableRow
                key={row.id}
                className={`text-sm text-white border-b border-gray-700/50 hover:bg-gray-700/40`}
              >
                <TableCell className="w-12 shrink-0 text-gray-300">
                  {index + 1}
                </TableCell>
                <TableCell className="max-w-[180px] px-3 py-2">
                  <div className="truncate" title={product?.name ?? "-"}>
                    {product?.name ?? "-"}
                  </div>
                </TableCell>
                <TableCell className="w-20 px-3 py-2 shrink-0 text-center text-gray-300">
                  {row.quantity}
                </TableCell>

                <TableCell className="w-40 px-3 py-2 shrink-0 text-left text-gray-300">
                  <span
                    className="block truncate"
                    title={type === "stockIn" ? supplier : destination}
                  >
                    {type === "stockIn" ? supplier : destination}
                  </span>
                </TableCell>

                {type === "stockOut" && (
                  <TableCell className="w-28 px-3 py-2 shrink-0 text-center text-gray-300">
                    {status}
                  </TableCell>
                )}

                <TableCell className="w-32 shrink-0 text-right">
                  <div className="flex items-center justify-center space-x-2">
                    <EditStockIn />
                    <DeleteStockIn />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableHistory;
