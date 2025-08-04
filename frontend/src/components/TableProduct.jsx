// @ts-check

import React from "react";
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
import { products } from "@/lib/constant";
import {
  AddProductDialog,
  DeleteProductDialog,
  EditProductDialog,
} from "./ProductActions";

const TableProduct = ({ rows }) => {
  return (
    <Card
      className={`w-full bg-gray-800/60 backdrop-blur border border-gray-700/40 rounded-xl shadow-lg`}
    >
      <CardHeader>
        <CardTitle className="text-gray-100 font-medium text-right">
          {/* <span>Suppliers</span> */}
          <AddProductDialog />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="">
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
                  <TableHead className="w-20 shrink-0 text-left text-sm text-white">
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
                  const product = products.find((p) => p.id === row.id);
                  return (
                    <TableRow
                      key={row.id}
                      className="border-b border-gray-700/50 hover:bg-gray-700/40"
                    >
                      <TableCell className="w-12 shrink-0 text-gray-300">
                        {index + 1}
                      </TableCell>
                      <TableCell
                        className="py-2 px-3 text-gray-200 truncate max-w-[180px]"
                        title={row.name}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        className="py-2 px-3 text-gray-300 truncate max-w-[240px]"
                        title={row.stock}
                      >
                        {row.stock}
                      </TableCell>

                      <TableCell className="w-32 shrink-0 text-right">
                        <div className="flex items-center justify-center space-x-2">
                          <EditProductDialog />
                          <DeleteProductDialog />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TableProduct;
