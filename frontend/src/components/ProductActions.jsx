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
import { FaEdit, FaTrash } from "react-icons/fa";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Pencil, Plus } from "lucide-react";

export const AddProductDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-black"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Product
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

export const EditProductDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-blue-400">
            <Pencil className="w-4 h-4" />
          </Button>
        </DialogTrigger>

        <DialogContent
          className={`bg-gray-900 text-white border border-gray-700`}
        >
          <DialogHeader>
            <DialogTitle className={`text-lg font-semibold`}>
              Edit Product
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
              Save
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export const DeleteProductDialog = () => {
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
            Apakah anda yakin ingin menghapus product ini ?
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
