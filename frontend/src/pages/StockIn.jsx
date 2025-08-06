// @ts-check

import PaginationPage from "@/components/PaginationPage";
import { AddStockInDialog, EditStockInDialog } from "@/components/StockActions";
import TableStockIn from "@/components/TableStockIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/context/AppContext";
import { usePagination } from "@/lib/paginationHooks";
import { AddStockInSchema, EditStockInSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const StockIn = () => {
  const {
    productsContext = [],
    stockInContext = [],
    stockOutContext = [],
    suppliersContext = [],
    addStockInDB,
    updateStockInDB,
  } = useContext(AppContext);

  const [formMode, setFormMode] = useState("add");
  const [formData, setFormData] = useState({
    id: "",
    productId: "",
    suppliersId: "",
    quantity: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(
      formMode === "add" ? AddStockInSchema : EditStockInSchema
    ),
    defaultValues: formData,
  });

  const [productFilter, setProductFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredData = useMemo(() => {
    const query = debouncedFilter.toLowerCase();

    return stockInContext.filter((r) => {
      const product = productsContext.find((p) => p.id === r.productId);
      return (
        !query ||
        product?.id.toLowerCase().includes(query) ||
        product?.name.toLowerCase().includes(query)
      );
    });
  }, [debouncedFilter, stockInContext, productsContext]);

  const rowMap = useMemo(() => {
    const map = new Map();
    stockInContext.forEach((item) => map.set(item.id, item));
    return map;
  }, [stockInContext]);

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedFilteredData,
    onPageChange,
  } = usePagination(filteredData, 5);

  // Add stock In
  const onSubmit = async (data) => {
    if (formMode === "add") {
      await addStockInDB(data);
    } else if (formMode === "edit") {
      await updateStockInDB(data);
    }

    reset();
    setFormMode("add");
    setSelectedRow(null);
    setFormData({
      id: "",
      productId: "",
      suppliersId: "",
      quantity: 0,
    });
  };

  // update stockIn
  const handleEdit = (id) => {
    const selected = rowMap.get(id);
    if (!selected) return;

    setFormMode("edit");

    setFormData({
      id: selected.id,
      productId: selected.productId,
      suppliersId: selected.suppliersId,
      quantity: selected.quantity,
    });

    setSelectedRow(id);
  };

  // update stock IN nnt kirim db
  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   updateStockInDB(formData);
  //   setSelectedRow(null);

  //   setFormData({ id: "", productId: "", suppliersId: "", quantity: 0 });
  // };

  useEffect(() => {
    if (formMode === "edit" && formData.id) {
      reset(formData);
    }
  }, [formMode, formData, reset]);

  // Waktu buat input search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(productFilter);
    }, 400); // bisa disesuaikan

    return () => clearTimeout(timer);
  }, [productFilter]);

  if (
    !productsContext ||
    !stockInContext ||
    !stockOutContext ||
    !suppliersContext
  )
    return null;

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
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          openDialog={openDialogAdd}
          setOpenDialog={setOpenDialogAdd}
          control={control}
          products={productsContext}
          suppliers={suppliersContext}
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
              rows={paginatedFilteredData}
              products={productsContext}
              suppliers={suppliersContext}
              // form={formData}
              // setForm={setFormData}
              // openDialog={openDialogEdit}
              // setOpenDialog={setOpenDialogEdit}
              // handleUpdate={handleUpdate}
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
              <EditStockInDialog
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                control={control}
                suppliers={suppliersContext}
                products={productsContext}
                // openDialog={openDialogAdd}
                // setOpenDialog={setOpenDialogAdd}
              />
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockIn;
