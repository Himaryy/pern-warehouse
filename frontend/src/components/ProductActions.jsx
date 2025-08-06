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
import { FaTrash } from "react-icons/fa";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";

export const AddProductDialog = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  openDialog,
  setOpenDialog,
}) => {
  const internalSubmit = (data) => {
    onSubmit(data);
    setOpenDialog(false);
  };
  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpenDialog(true)}
        className="bg-green-500 hover:bg-green-600 text-black"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Product
      </Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className={`bg-gray-900 text-white border border-gray-700`}
        >
          <form onSubmit={handleSubmit(internalSubmit)}>
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
                  {...register("name")}
                  type="text"
                  placeholder="Daging Sapi"
                  className={`bg-gray-800 border-gray-600 text-white mt-1`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400 italic">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="stockProduct" className={`text-sm`}>
                  Stock Product
                </Label>
                <Input
                  {...register("stock", { valueAsNumber: true })}
                  placeholder="100"
                  className={`bg-gray-800 border-gray-600 text-white mt-1`}
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-400 italic">
                    {errors.stock.message}
                  </p>
                )}
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
    </>
  );
};

export const EditProductDialog = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
}) => {
  return (
    <>
      <DialogContent
        className={`bg-gray-900 text-white border border-gray-700`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("name")}
                type="text"
                placeholder="Daging Sapi"
                className={`bg-gray-800 border-gray-600 text-white mt-1`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400 italic">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="stockProduct" className={`text-sm`}>
                Stock Product
              </Label>
              <Input
                {...register("stock", { valueAsNumber: true })}
                placeholder="100"
                className={`bg-gray-800 border-gray-600 text-white mt-1`}
                autoFocus={false}
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-400 italic">
                  {errors.stock.message}
                </p>
              )}
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
        </form>
      </DialogContent>
    </>
  );
};

export const DeleteProductDialog = ({ handleDelete, productId }) => {
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
          <Button
            onClick={() => handleDelete(productId)}
            className={`w-15`}
            variant="destructive"
          >
            Ya !
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
