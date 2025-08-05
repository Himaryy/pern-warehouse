// @ts-check
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Eye, Pencil, Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FaTrash } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const AddStockInDialog = ({
  products = [],
  suppliers = [],
  // fetchProduts,
  // fetchSuppliers,
  handleSubmit,
  form,
  setForm,
  openDialog,
  setOpenDialog,
}) => {
  const internalSubmit = (e) => {
    handleSubmit(e);
    setOpenDialog(false);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-green-500 hover:bg-green-600 text-black"
          onClick={() => setOpenDialog(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          New Stock
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`bg-gray-900 text-white border border-gray-700`}
      >
        <form onSubmit={internalSubmit}>
          <DialogHeader>
            <DialogTitle className={`text-lg font-semibold`}>
              Tambah Product
            </DialogTitle>
          </DialogHeader>

          {/* Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="productName" className={`text-sm`}>
                Nama Produk
              </Label>
              <Select
                value={form.productId}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, productId: val }))
                }
              >
                <SelectTrigger
                  className={`w-full mt-1 bg-gray-800 border-gray-600 text-white`}
                >
                  <SelectValue placeholder="Pilih Salah Satu:" />
                </SelectTrigger>

                <SelectContent className={`z-50`}>
                  <SelectGroup>
                    <SelectLabel>Nama Produk</SelectLabel>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="stockProduct" className={`text-sm`}>
                Stock Product
              </Label>
              <Input
                value={form.quantity}
                onChange={(e) =>
                  setForm((val) => ({
                    ...val,
                    quantity: Number(e.target.value),
                  }))
                }
                placeholder="100"
                className={`bg-gray-800 border-gray-600 text-white mt-1`}
              />
            </div>

            <div>
              <Label htmlFor="productName" className={`text-sm`}>
                Nama Supplier
              </Label>
              <Select
                value={form.supplierId}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, suppliersId: val }))
                }
              >
                <SelectTrigger
                  className={`w-full mt-1 bg-gray-800 border-gray-600 text-white`}
                >
                  <SelectValue placeholder="Pilih Salah Satu:" />
                </SelectTrigger>

                <SelectContent className={`z-50`}>
                  <SelectGroup>
                    <SelectLabel>Supplier</SelectLabel>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6 pt-4">
            <Button
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600"
            >
              Tambah Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const EditStockInDialog = ({
  form,
  setForm,
  products,
  suppliers,
  handleUpdate,
}) => {
  return (
    <>
      <DialogContent className="bg-gray-900 text-white border-gray-700 ">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle>Edit Data Stock In</DialogTitle>
            <DialogDescription>Update information.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 space-y-4 mt-4">
            <div>
              <Label htmlFor="SupplierName" className={`pb-2`}>
                Nama Produk
              </Label>
              <Select
                value={form?.productId}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, productId: val }))
                }
              >
                <SelectTrigger
                  className={`w-full mt-1 bg-gray-800 border-gray-600 text-white`}
                >
                  <SelectValue placeholder="Pilih Salah Satu:" />
                </SelectTrigger>

                <SelectContent className={`z-50`}>
                  <SelectGroup>
                    <SelectLabel>Nama Produk</SelectLabel>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="stock" className="text-sm pb-2">
                Stock
              </Label>
              <Input
                value={form?.quantity}
                onChange={(e) =>
                  setForm((val) => ({
                    ...val,
                    quantity: Number(e.target.value),
                  }))
                }
                placeholder="100"
                className={`bg-gray-800 border-gray-600 text-white mt-1`}
              />
            </div>

            <div>
              <Label htmlFor="productName" className={`text-sm`}>
                Nama Supplier
              </Label>
              <Select
                value={form?.suppliersId}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, suppliersId: val }))
                }
              >
                <SelectTrigger
                  className={`w-full mt-1 bg-gray-800 border-gray-600 text-white`}
                >
                  <SelectValue placeholder="Pilih Salah Satu:" />
                </SelectTrigger>

                <SelectContent className={`z-50`}>
                  <SelectGroup>
                    <SelectLabel>Supplier</SelectLabel>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4">
            <Button
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600"
            >
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  );
};

export const DeleteStockInDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`bg-red-500 text-white`}>
          <FaTrash />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus data ini ?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end">
          <Button className={`w-15`} variant="destructive">
            Ya !
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ViewDetailStockIn = ({ data, products, suppliers, className }) => {
  const product = products.find((p) => p.id === data.productId);
  const supplier = suppliers.find((s) => s.id === data.suppliersId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`text-blue-400 ${className}`}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-md">
        <form>
          <DialogHeader>
            <DialogTitle>View Data Stock</DialogTitle>
            <DialogDescription>All information.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 space-y-4 mt-4 mb-4">
            <div>
              <Label htmlFor="SupplierName" className={`pb-2`}>
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={product?.name}
                disabled
                placeholder="PT. Daging Indonesia"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="stock" className="text-sm pb-2">
                Stock
              </Label>
              <Input
                type={"number"}
                id="stock"
                name="stock"
                value={data.quantity}
                disabled
                placeholder="125"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="supplierName" className="text-sm pb-2">
                Supplier
              </Label>
              <Input
                id="supplierName"
                name="supplierName"
                value={supplier?.name}
                disabled
                placeholder="PT. Merauke Indonesia"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* <div className="flex justify-end gap-2 mt-6 pt-4">
            <Button
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600"
            >
              Simpan
            </Button>
          </div> */}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const AddStockOutDialog = ({
  products,
  handleSubmit,
  form,
  setForm,
  openDialog,
  setOpenDialog,
}) => {
  const internalSubmit = (e) => {
    handleSubmit(e);
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-green-500 hover:bg-green-600 text-black"
          onClick={() => setOpenDialog(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Request Barang
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`bg-gray-900 text-white border border-gray-700`}
      >
        <form onSubmit={internalSubmit}>
          <DialogHeader>
            <DialogTitle className={`text-lg font-semibold`}>
              Ajukan Permintaan Barang
            </DialogTitle>
            <DialogDescription>
              Permintaan akan diproses setelah disetujui oleh admin.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="productName" className={`text-sm`}>
                Nama Produk
              </Label>
              <Select
                value={form.productId}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, productId: val }))
                }
              >
                <SelectTrigger
                  className={`w-full mt-1 bg-gray-800 border-gray-600 text-white`}
                >
                  <SelectValue placeholder="Pilih Salah Satu:" />
                </SelectTrigger>

                <SelectContent className={`z-50`}>
                  <SelectGroup>
                    <SelectLabel>Nama Produk</SelectLabel>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="stockProduct" className={`text-sm`}>
                Stock Product
              </Label>
              <Input
                value={form.quantity}
                onChange={(e) =>
                  setForm((val) => ({
                    ...val,
                    quantity: Number(e.target.value),
                  }))
                }
                placeholder="100"
                className={`bg-gray-800 border-gray-600 text-white mt-1`}
              />
            </div>

            <div>
              <Label htmlFor="destination" className={`text-sm`}>
                Destination
              </Label>
              <Input
                value={form.destination}
                onChange={(e) =>
                  setForm((val) => ({
                    ...val,
                    destination: String(e.target.value),
                  }))
                }
                placeholder="Office HQ"
                className={`bg-gray-800 border-gray-600 text-white mt-1`}
              />
            </div>

            {/* <div>
              <Label htmlFor="status" className={`pb-2`}>
                Status
              </Label>
              <Select
                value={form?.status}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, status: val }))
                }
              >
                <SelectTrigger
                  className={`w-full mt-1 bg-gray-800 border-gray-600 text-white`}
                >
                  <SelectValue placeholder="Pilih Salah Satu:" />
                </SelectTrigger>

                <SelectContent className={`z-50`}>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {statusOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item?.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4">
            <Button
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600"
            >
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const EditStockOutDialog = ({
  form,
  setForm,
  products,
  handleUpdate,
}) => {
  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
  ];
  return (
    <>
      <DialogContent className="bg-gray-900 text-white border-gray-700 ">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle>Edit Data Stock Out</DialogTitle>
            <DialogDescription>Update information.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 space-y-4 mt-4">
            <div>
              <Label htmlFor="namaProduk" className={`pb-2`}>
                Nama Produk
              </Label>
              <Select
                value={form?.productId}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, productId: val }))
                }
              >
                <SelectTrigger
                  className={`w-full mt-1 bg-gray-800 border-gray-600 text-white`}
                >
                  <SelectValue placeholder="Pilih Salah Satu:" />
                </SelectTrigger>

                <SelectContent className={`z-50`}>
                  <SelectGroup>
                    <SelectLabel>Nama Produk</SelectLabel>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="stock" className="text-sm pb-2">
                Stock
              </Label>
              <Input
                value={form?.quantity}
                onChange={(e) =>
                  setForm((val) => ({
                    ...val,
                    quantity: Number(e.target.value),
                  }))
                }
                placeholder="100"
                className={`bg-gray-800 border-gray-600 text-white mt-1`}
              />
            </div>

            <div>
              <Label htmlFor="destination" className="text-sm pb-2">
                Destination
              </Label>
              <Input
                value={form?.destination}
                onChange={(e) =>
                  setForm((val) => ({
                    ...val,
                    destination: String(e.target.value),
                  }))
                }
                placeholder="Office HQ"
                className={`bg-gray-800 border-gray-600 text-white mt-1`}
              />
            </div>

            <div>
              <Label htmlFor="status" className={`pb-2`}>
                Status
              </Label>
              <Select
                value={form?.status}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, status: val }))
                }
              >
                <SelectTrigger
                  className={`w-full mt-1 bg-gray-800 border-gray-600 text-white`}
                >
                  <SelectValue placeholder="Pilih Salah Satu:" />
                </SelectTrigger>

                <SelectContent className={`z-50`}>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {statusOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item?.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4">
            <Button
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600"
            >
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  );
};

export const ViewDetailStockOut = ({ data, products }) => {
  const product = products.find((p) => p.id === data.productId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-blue-400">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-md">
        <form>
          <DialogHeader>
            <DialogTitle>View Data Stock Out</DialogTitle>
            <DialogDescription>All information.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 space-y-4 mt-4 mb-4">
            <div>
              <Label htmlFor="SupplierName" className={`pb-2`}>
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={product?.name}
                disabled
                placeholder="PT. Daging Indonesia"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="stock" className="text-sm pb-2">
                Quantity
              </Label>
              <Input
                type={"number"}
                id="stock"
                name="stock"
                value={data?.quantity}
                disabled
                placeholder="125"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="destinationName" className="text-sm pb-2">
                Destination
              </Label>
              <Input
                id="destinationName"
                name="destinationName"
                value={data?.destination}
                disabled
                placeholder="PT. Merauke Indonesia"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="status" className="text-sm pb-2">
                Status
              </Label>
              <Select disabled value={data.status}>
                <SelectTrigger
                  className={`w-[180px] bg-gray-800 border-gray-600 text-white`}
                >
                  <SelectValue placeholder="Pilih Salah Satu:" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <Input
                id="destinationName"
                name="destinationName"
                value={data.destination}
                disabled
                placeholder="PT. Merauke Indonesia"
                className="bg-gray-800 border-gray-600 text-white"
              /> */}
            </div>
          </div>

          {/* <div className="flex justify-end gap-2 mt-6 pt-4">
            <Button
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600"
            >
              Simpan
            </Button>
          </div> */}
        </form>
      </DialogContent>
    </Dialog>
  );
};
