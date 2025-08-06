// @ts-check
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { ViewDetailStockOut } from "./StockActions";

const TableStockOut = ({ rows, products, handleEdit }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 shrink-0 text-sm text-white">
              No
            </TableHead>
            <TableHead className="w-10 text-center text-sm text-white">
              Product
            </TableHead>
            <TableHead className="w-20 shrink-0 text-center text-sm text-white">
              Qty
            </TableHead>
            <TableHead
              className={`w-40 shrink-0 text-center text-sm text-white`}
            >
              Destination
            </TableHead>
            <TableHead
              className={`w-28 shrink-0 text-center text-sm text-white`}
            >
              Status
            </TableHead>
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
                    {product?.name}
                  </div>
                </TableCell>
                <TableCell className="w-20 px-3 py-2 shrink-0 text-center text-gray-300">
                  {row.quantity}
                </TableCell>
                <TableCell className="w-40 px-3 py-2 shrink-0 text-left text-gray-300">
                  {row?.destination}
                </TableCell>
                <TableCell className="w-40 px-3 py-2 shrink-0 text-center text-gray-300">
                  {row?.status}
                </TableCell>
                <TableCell className="w-32 shrink-0 text-right">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      onClick={() => {
                        handleEdit(row.id); // buka modal di sini
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-blue-400"
                      disabled={row.status !== "Pending"}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <ViewDetailStockOut data={row} products={products} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default TableStockOut;
