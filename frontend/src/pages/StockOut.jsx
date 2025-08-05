// @ts-check

import {
  AddStockOutDialog,
  EditStockOutDialog,
  ViewDetailStockOut,
} from "@/components/StockActions";
import TableStockOut from "@/components/TableStockOut";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/context/AppContext";
import { Search } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";

const StockOut = () => {
  const {
    products = [],
    stockOut = [],
    addStockOutDB,
    updateStockOutDB,
  } = useContext(AppContext);
  const [productFilter, setProductFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    productId: "",
    destination: "",
    quantity: 0,
    status: "Pending",
  });

  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredData = useMemo(() => {
    const query = debouncedFilter.toLowerCase();

    return stockOut.filter((r) => {
      const product = products.find((p) => p.id === r.productId);
      return (
        !query ||
        product?.id.toLowerCase().includes(query) ||
        product?.name.toLowerCase().includes(query)
      );
    });
  }, [debouncedFilter, stockOut, products]);

  const rowMap = useMemo(() => {
    const map = new Map();
    stockOut.forEach((item) => map.set(item.id, item));
    return map;
  }, [stockOut]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    addStockOutDB(formData);
    setFormData({
      id: "",
      productId: "",
      destination: "",
      quantity: 0,
      status: "Pending",
    });
    // console.log(formData);
  };

  const handleEdit = (id) => {
    const selected = rowMap.get(id);
    if (!selected) return null;
    setSelectedRow(id);

    setFormData({
      id: selected.id,
      productId: selected.productId,
      destination: selected.destination,
      quantity: selected.quantity,
      status: selected.status,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    updateStockOutDB(formData);
    // console.log("payload", formData);
    setSelectedRow(null);
    setFormData({
      id: "",
      productId: "",
      destination: "",
      quantity: 0,
      status: "",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(productFilter);
    }, 400); // bisa disesuaikan

    return () => clearTimeout(timer);
  }, [productFilter]);

  if (!products || !stockOut) return null;

  return (
    <div className="p-6 space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">
            Stock-Out Records
          </h1>
          <p className="mt-1 font-sans text-sm text-gray-400">
            Monitor every outgoing shipment—destination, quantity, and approval
            status—in real time.
          </p>
        </div>
        <AddStockOutDialog
          form={formData}
          setForm={setFormData}
          products={products}
          handleSubmit={handleSubmit}
          openDialog={openDialogAdd}
          setOpenDialog={setOpenDialogAdd}
        />
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
            <TableStockOut
              rows={filteredData}
              products={products}
              handleEdit={handleEdit}
            />

            <Dialog
              open={selectedRow !== null}
              onOpenChange={(open) => {
                if (!open) setSelectedRow(null); // close manual
              }}
            >
              <EditStockOutDialog
                key={formData.id}
                form={formData}
                setForm={setFormData}
                products={products}
                handleUpdate={handleUpdate}
              />
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockOut;
