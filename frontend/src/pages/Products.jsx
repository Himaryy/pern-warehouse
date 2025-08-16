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
import { usePagination } from "@/lib/paginationHooks";
import PaginationPage from "@/components/PaginationPage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema, EditProductSchema } from "@/lib/validations";

const Products = () => {
  const [formMode, setFormMode] = useState("add");
  const [formData, setFormData] = useState({ id: "", name: "", stock: 0 });

  const {
    productsContext = [],
    addProductDB,
    updateProductDB,
    deleteProductDB,
  } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(
      formMode === "add" ? AddProductSchema : EditProductSchema
    ),
    defaultValues: formData,
  });

  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [productFilter, setProductFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredData = useMemo(() => {
    const query = debouncedFilter.toLowerCase();

    return productsContext.filter(
      (item) =>
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
    );
  }, [debouncedFilter, productsContext]);

  const rowMap = useMemo(() => {
    const map = new Map();
    productsContext.forEach((item) => map.set(item.id, item));
    return map;
  }, [productsContext]);

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedFilteredData,
    onPageChange,
  } = usePagination(filteredData, 5);

  const onSubmit = async (data) => {
    if (formMode === "add") {
      await addProductDB(data);
    } else if (formMode === "edit") {
      await updateProductDB(data);
    }
    reset();
    setFormMode("add");
    setSelectedRow(null);
    setFormData({ id: "", name: "", stock: 0 });
    // setFormMode("add");
  };

  const handleEdit = (id) => {
    const selected = rowMap.get(id);
    if (!selected) return null;

    setFormMode("edit");
    reset({
      id: selected.id,
      name: selected.name,
      stock: selected.stock,
    });
    setSelectedRow(id);
  };

  // const handleUpdate = async (data) => {
  //   updateProductDB(data);
  //   setSelectedRow(null);
  //   reset();
  // };

  const handleDelete = async (id) => {
    deleteProductDB(id);
    setSelectedRow(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(productFilter);
    }, 400); // bisa disesuaikan

    return () => clearTimeout(timer);
  }, [productFilter]);

  useEffect(() => {
    if (formMode === "edit" && formData.id) {
      reset(formData);
    }
  }, [formMode, formData, reset]);

  if (!productsContext) return null;

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
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
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
              rows={paginatedFilteredData}
              products={productsContext}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            <PaginationPage
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />

            <Dialog
              open={selectedRow !== null}
              onOpenChange={(open) => {
                if (!open) setSelectedRow(null); // close manual
              }}
            >
              <EditProductDialog
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
              />
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
