// @ts-check

import { AddStockInDialog, EditStockInDialog } from "@/components/StockActions";
import TableStockIn from "@/components/TableStockIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/context/AppContext";
import { Search } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";

const StockIn = () => {
  const {
    products = [],
    stockIn = [],
    stockOut = [],
    suppliers = [],
    addStockInDB,
    updateStockInDB,
  } = useContext(AppContext);
  const [productFilter, setProductFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    productId: "",
    suppliersId: "",
    quantity: 0,
  });
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Waktu buat input search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(productFilter);
    }, 400); // bisa disesuaikan

    return () => clearTimeout(timer);
  }, [productFilter]);

  const filteredData = useMemo(() => {
    const query = debouncedFilter.toLowerCase();

    return stockIn.filter((r) => {
      const product = products.find((p) => p.id === r.productId);
      return (
        !query ||
        product?.id.toLowerCase().includes(query) ||
        product?.name.toLowerCase().includes(query)
      );
    });
  }, [debouncedFilter, stockIn, products]);

  if (!products || !stockIn || !stockOut || !suppliers) return null;

  const rowMap = useMemo(() => {
    const map = new Map();
    stockIn.forEach((item) => map.set(item.id, item));
    return map;
  }, [stockIn]);

  // Add stock In
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStockInDB(formData);
    setFormData({ id: "", productId: "", suppliersId: "", quantity: 0 });
  };

  // update stockIn
  const handleEdit = (id) => {
    const selected = rowMap.get(id);
    if (!selected) return;

    setFormData({
      id: selected.id,
      productId: selected.productId,
      suppliersId: selected.suppliersId,
      quantity: selected.quantity,
    });

    setSelectedRow(id);
  };

  // update stock IN nnt kirim db
  const handleUpdate = async (e) => {
    e.preventDefault();
    updateStockInDB(formData);
    setSelectedRow(null);
    console.log(formData);
    setFormData({ id: "", productId: "", suppliersId: "", quantity: 0 });
  };

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
        <AddStockInDialog
          form={formData}
          setForm={setFormData}
          products={products}
          suppliers={suppliers}
          handleSubmit={handleSubmit}
          openDialog={openDialogAdd}
          setOpenDialog={setOpenDialogAdd}
        />
      </div>

      <Card
        className={`w-full bg-gray-800/60 border border-gray-700/40 rounded-xl shadow-lg`}
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
            {/* <TableHistory type="stockIn" rows={filteredData} /> */}
            <TableStockIn
              rows={filteredData}
              products={products}
              suppliers={suppliers}
              // form={formData}
              // setForm={setFormData}
              // openDialog={openDialogEdit}
              // setOpenDialog={setOpenDialogEdit}
              // handleUpdate={handleUpdate}
              handleEdit={handleEdit}
            />
            <Dialog
              open={selectedRow !== null}
              onOpenChange={(open) => {
                if (!open) setSelectedRow(null); // close manual
              }}
            >
              <EditStockInDialog
                form={formData}
                setForm={setFormData}
                products={products}
                suppliers={suppliers}
                handleUpdate={handleUpdate}
              />
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockIn;
