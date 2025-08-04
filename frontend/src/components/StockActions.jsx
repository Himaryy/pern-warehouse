// @ts-check
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Pencil, Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FaTrash } from "react-icons/fa";

export const AddStockIn = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-black"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Stock
          </Button>
        </DialogTrigger>

        <DialogContent
          className={`bg-gray-900 text-white border border-gray-700`}
        >
          <DialogHeader>
            <DialogTitle className={`text-lg font-semibold`}>
              Tambah Product
            </DialogTitle>
          </DialogHeader>

          {/* Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="productName" className={`text-sm`}>
                Nama Product
              </Label>
              <Input
                type="text"
                placeholder="Daging Sapi"
                className={`bg-gray-800 border-gray-600 text-white mt-1`}
                autoFocus={false}
              />
            </div>
            <div>
              <Label htmlFor="stockProduct" className={`text-sm`}>
                Stock Product
              </Label>
              <Input
                type="number"
                placeholder="100"
                className={`bg-gray-800 border-gray-600 text-white mt-1`}
                autoFocus={false}
              />
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
        </DialogContent>
      </form>
    </Dialog>
  );
};

export const EditStockIn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-blue-400">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-md">
        <form>
          <DialogHeader>
            <DialogTitle>Edit Data Stock In</DialogTitle>
            <DialogDescription>Update information.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 space-y-4 mt-4">
            <div>
              <Label htmlFor="SupplierName" className={`pb-2`}>
                Name
              </Label>
              <Input
                id="name"
                name="name"
                required
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
                required
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
                required
                placeholder="PT. Merauke Indonesia"
                className="bg-gray-800 border-gray-600 text-white"
              />
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
    </Dialog>
  );
};

export const DeleteStockIn = () => {
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
