// @ts-check
import React, { useContext, useEffect, useMemo, useState } from "react";
import TableProduct from "@/components/TableProduct";
import {
  AddProductDialog,
  EditProductDialog,
} from "@/components/ProductActions";
import { AppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";

const Products = () => {
  const { products, addProductDB, updateProductDB, deleteProductDB } =
    useContext(AppContext);

  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [productFilter, setProductFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    stock: 0,
  });

  const filteredData = useMemo(() => {
    const query = debouncedFilter.toLowerCase();

    return products.filter(
      (item) =>
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
    );
  }, [debouncedFilter, products]);

  const rowMap = useMemo(() => {
    const map = new Map();
    products.forEach((item) => map.set(item.id, item));
    return map;
  }, [products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    addProductDB(formData);
    setFormData({
      id: "",
      name: "",
      stock: 0,
    });
  };

  const handleEdit = (id) => {
    const selected = rowMap.get(id);
    if (!selected) return null;

    setSelectedRow(id);

    setFormData({
      id: selected.id,
      name: selected.name,
      stock: selected.stock,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    updateProductDB(formData);
    setSelectedRow(null);

    setFormData({
      id: "",
      name: "",
      stock: 0,
    });
  };

  const handleDelete = async (id) => {
    // console.log("cek ID", id);
    deleteProductDB(id);
    setSelectedRow(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(productFilter);
    }, 400); // bisa disesuaikan

    return () => clearTimeout(timer);
  }, [productFilter]);

  if (!products) return null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">
            Product Catalog
          </h1>
          <p className="font-sans text-base text-gray-300">
            Browse, add, and update every SKU in your warehouse.
          </p>
        </div>
        <AddProductDialog
          form={formData}
          setForm={setFormData}
          products={products}
          handleSubmit={handleSubmit}
          openDialog={openDialogAdd}
          setOpenDialog={setOpenDialogAdd}
        />
      </div>

      {/* Placeholder for product table/grid */}

      {/* <TableProduct
        data={products}
        formData={formData}
        setFormData={setFormData}
      /> */}
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
            <TableProduct
              rows={filteredData}
              products={products}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            <Dialog
              open={selectedRow !== null}
              onOpenChange={(open) => {
                if (!open) setSelectedRow(null); // close manual
              }}
            >
              <EditProductDialog
                form={formData}
                setForm={setFormData}
                handleUpdate={handleUpdate}
              />
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
