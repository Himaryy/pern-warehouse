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

export const AddSupplierDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`bg-green-500 hover:bg-green-600 text-black font-medium`}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Supplier
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`bg-gray-900 text-white border border-gray-700 max-w-md`}
      >
        <form>
          <DialogHeader>
            <DialogTitle>New Supplier ?</DialogTitle>
            <DialogDescription>
              Enter the supplier details to add them to your warehouse list.
            </DialogDescription>
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
              <Label htmlFor="address" className="text-sm pb-2">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                required
                placeholder="Jl. Sudirman No. 123"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-sm pb-2">
                Phone
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="+62 8123456789"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4">
            <Button
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600"
            >
              Tambah Supplier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const EditSupplierDialog = () => {
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
            <DialogTitle>Edit Supplier</DialogTitle>
            <DialogDescription>
              Update the supplier information.
            </DialogDescription>
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
              <Label htmlFor="address" className="text-sm pb-2">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                required
                placeholder="Jl. Sudirman No. 123"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-sm pb-2">
                Phone
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="+62 8123456789"
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

export const DeleteSupplierDialog = () => {
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
            Apakah anda yakin ingin menghapus data supplier ini ?
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
