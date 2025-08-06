// @ts-check

import PaginationPage from "@/components/PaginationPage";
import {
  AddSupplierDialog,
  EditSupplierDialog,
} from "@/components/SupplierActions";

import TableSupplier from "@/components/TableSupplier";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/context/AppContext";
import { usePagination } from "@/lib/paginationHooks";
import { AddSupplierSchema, EditSupplierSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const Suppliers = () => {
  const {
    suppliersContext = [],
    addSupplierDB,
    updateSupplierDB,
    deleteSupplierDB,
  } = useContext(AppContext);

  const [formModeSupplier, setFormModeSupplier] = useState("add");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phoneNumber: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(
      formModeSupplier === "add" ? AddSupplierSchema : EditSupplierSchema
    ),
    defaultValues: formData,
  });

  const [supplierFilter, setSupplierFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredData = useMemo(() => {
    const query = debouncedFilter.toLowerCase();

    return suppliersContext.filter(
      (item) =>
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
    );
  }, [debouncedFilter, suppliersContext]);

  const rowMap = useMemo(() => {
    const map = new Map();
    suppliersContext.forEach((item) => map.set(item.id, item));
    return map;
  }, [suppliersContext]);

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedFilteredData,
    onPageChange,
  } = usePagination(filteredData, 5);

  const onSubmit = async (data) => {
    if (formModeSupplier === "add") {
      await addSupplierDB(data);
    } else if (formModeSupplier === "edit") {
      await updateSupplierDB(data);
    }
    setFormModeSupplier("add");
    setSelectedRow(null);
    reset();
  };

  const handleEdit = (id) => {
    const selected = rowMap.get(id);
    if (!selected) return null;

    setSelectedRow(id);
    setFormModeSupplier("edit");
    setFormData({
      id: selected.id,
      name: selected.name,
      address: selected.address,
      phoneNumber: selected.phoneNumber,
    });
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   updateSupplierDB(formData);
  //   setSelectedRow(null);

  //   setFormData({
  //     id: "",
  //     name: "",
  //     address: "",
  //     phoneNumber: "",
  //   });
  // };

  const handleDelete = async (id) => {
    deleteSupplierDB(id);
    setSelectedRow(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(supplierFilter);
    }, 400); // bisa disesuaikan

    return () => clearTimeout(timer);
  }, [supplierFilter]);

  useEffect(() => {
    if (formModeSupplier === "edit" && formData.id) {
      reset(formData);
    }
  }, [formModeSupplier, formData, reset]);

  if (!suppliersContext) return null;

  return (
    <div className="p-6 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">
            Suppliers Hub
          </h1>
          <p className="mt-1 font-sans text-sm text-gray-400">
            View, add, and manage every vendor in one place.
          </p>
        </div>
        <AddSupplierDialog
          errors={errors}
          handleSubmit={handleSubmit}
          openDialog={openDialogAdd}
          register={register}
          setOpenDialog={setOpenDialogAdd}
          onSubmit={onSubmit}
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
                placeholder="Supplier ID / Name"
                className={`w-48 bg-gray-800/50 border-gray-700 text-white`}
                value={supplierFilter}
                onChange={(e) => setSupplierFilter(e.target.value)}
              />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2">
            <TableSupplier
              rows={paginatedFilteredData}
              suppliers={suppliersContext}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            <PaginationPage
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />

            {/* <TableProduct
              rows={filteredData}
              products={products}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            /> */}

            <Dialog
              open={selectedRow !== null}
              onOpenChange={(open) => {
                if (!open) setSelectedRow(null); // close manual
              }}
            >
              <EditSupplierDialog
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

export default Suppliers;
