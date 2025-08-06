// @ts-check

import PaginationPage from "@/components/PaginationPage";
import {
  AddStockOutDialog,
  EditStockOutDialog,
} from "@/components/StockActions";
import TableStockOut from "@/components/TableStockOut";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/context/AppContext";
import { usePagination } from "@/lib/paginationHooks";
import { AddStockOutSchema, EditStockOutSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const StockOut = () => {
  const {
    productsContext = [],
    stockOutContext = [],
    addStockOutDB,
    updateStockOutDB,
  } = useContext(AppContext);

  const [formData, setFormData] = useState({
    id: "",
    productId: "",
    destination: "",
    quantity: 0,
    status: "Pending",
  });
  const [formMode, setFormMode] = useState("add");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(
      formMode === "add" ? AddStockOutSchema : EditStockOutSchema
    ),
    defaultValues: formData,
  });

  const [productFilter, setProductFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredData = useMemo(() => {
    const query = debouncedFilter.toLowerCase();

    return stockOutContext.filter((r) => {
      const product = productsContext.find((p) => p.id === r.productId);
      return (
        !query ||
        product?.id.toLowerCase().includes(query) ||
        product?.name.toLowerCase().includes(query)
      );
    });
  }, [debouncedFilter, stockOutContext, productsContext]);

  const rowMap = useMemo(() => {
    const map = new Map();
    stockOutContext.forEach((item) => map.set(item.id, item));
    return map;
  }, [stockOutContext]);

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedFilteredData,
    onPageChange,
  } = usePagination(filteredData, 5);

  const onSubmit = async (data) => {
    if (formMode === "add") {
      await addStockOutDB(data);
    } else if (formMode === "edit") {
      await updateStockOutDB(data);
    }
    setFormMode("add");
    setSelectedRow(null);
    setFormData({
      id: "",
      productId: "",
      destination: "",
      quantity: 0,
      status: "Pending",
    });
    reset();
  };

  const handleEdit = (id) => {
    const selected = rowMap.get(id);
    if (!selected) return null;
    setSelectedRow(id);
    setFormMode("edit");

    setFormData({
      id: selected.id,
      productId: selected.productId,
      destination: selected.destination,
      quantity: selected.quantity,
      status: selected.status,
    });
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   updateStockOutDB(formData);

  //   setSelectedRow(null);
  //   setFormData({
  //     id: "",
  //     productId: "",
  //     destination: "",
  //     quantity: 0,
  //     status: "",
  //   });
  // };

  useEffect(() => {
    if (formMode === "edit" && formData.id) {
      reset(formData);
    }
  }, [formMode, formData, reset]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(productFilter);
    }, 400); // bisa disesuaikan

    return () => clearTimeout(timer);
  }, [productFilter]);

  if (!productsContext || !stockOutContext) return null;

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
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          openDialog={openDialogAdd}
          setOpenDialog={setOpenDialogAdd}
          control={control}
          products={productsContext}
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
              rows={paginatedFilteredData}
              products={productsContext}
              handleEdit={handleEdit}
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
              <EditStockOutDialog
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                control={control}
                products={productsContext}
              />
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockOut;
