// @ts-check

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { DeleteProductDialog, EditProductDialog } from "./ProductActions";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

const TableProduct = ({ rows, products, handleEdit, handleDelete }) => {
  return (
    <>
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className={`hover:bg-gray-500/30`}>
            <TableHead className="w-12 shrink-0 text-sm text-white">
              No
            </TableHead>
            <TableHead className="w-10 text-left text-sm text-white">
              Product Name
            </TableHead>
            <TableHead className="w-20 shrink-0 text-center text-sm text-white">
              Stock Product
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
            // const product = products.find((p) => p.id === row.productId);
            return (
              <TableRow
                key={row.id}
                className={`text-sm text-white border-b border-gray-700/50 hover:bg-gray-700/40`}
              >
                <TableCell className="w-12 shrink-0 text-gray-300">
                  {index + 1}
                </TableCell>
                <TableCell className="max-w-[180px] px-3 py-2">
                  <div className="truncate" title={row?.name ?? "-"}>
                    {row?.name}
                  </div>
                </TableCell>
                <TableCell className="w-20 px-3 py-2 shrink-0 text-center text-gray-300">
                  {row?.stock}
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
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <DeleteProductDialog
                      handleDelete={handleDelete}
                      productId={row.id}
                    />
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

export default TableProduct;
