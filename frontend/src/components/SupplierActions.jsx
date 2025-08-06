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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FaTrash } from "react-icons/fa";
import { Plus } from "lucide-react";

export const AddSupplierDialog = ({
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
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-green-500 hover:bg-green-600 text-black"
          onClick={() => setOpenDialog(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Tambah Supplier
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`bg-gray-900 text-white border border-gray-700 max-w-md`}
      >
        <form onSubmit={handleSubmit(internalSubmit)}>
          <DialogHeader>
            <DialogTitle className={`text-lg font-semibold`}>
              New Supplier ?
            </DialogTitle>
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
                {...register("name")}
                id="name"
                name="name"
                required
                placeholder="PT. Azco"
                className="bg-gray-800 border-gray-600 text-white"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400 italic">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="address" className="text-sm pb-2">
                Address
              </Label>
              <Input
                {...register("address")}
                id="address"
                name="address"
                required
                placeholder="Jl. Sudirman No. 123"
                className="bg-gray-800 border-gray-600 text-white"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-400 italic">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-sm pb-2">
                Phone
              </Label>
              <Input
                {...register("phoneNumber")}
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="+62 8123456789"
                className="bg-gray-800 border-gray-600 text-white"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-400 italic">
                  {errors.phoneNumber.message}
                </p>
              )}
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

export const EditSupplierDialog = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
}) => {
  return (
    <>
      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("name")}
                id="name"
                name="name"
                required
                placeholder="PT. Azko"
                className="bg-gray-800 border-gray-600 text-white"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400 italic">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="address" className="text-sm pb-2">
                Address
              </Label>
              <Input
                {...register("address")}
                id="address"
                name="address"
                required
                placeholder="Jl. Sudirman No. 123"
                className="bg-gray-800 border-gray-600 text-white"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-400 italic">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-sm pb-2">
                Phone Number
              </Label>
              <Input
                {...register("phoneNumber")}
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="+62 8123456789"
                className="bg-gray-800 border-gray-600 text-white"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-400 italic">
                  {errors.phoneNumber.message}
                </p>
              )}
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

export const DeleteSupplierDialog = ({ handleDelete, suppliersId }) => {
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
          <Button
            onClick={() => handleDelete(suppliersId)}
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
