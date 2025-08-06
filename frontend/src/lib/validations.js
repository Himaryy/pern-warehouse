import z from "zod";

export const AddProductSchema = z.object({
  // id: z.string().min(3),
  name: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(100, "Maksimal 100 karakter"),
  stock: z.number().min(1, "Minimal 1"),
});

export const EditProductSchema = z.object({
  id: z.string().min(3),
  name: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(100, "Maksimal 100 karakter"),
  stock: z.number().min(1, "Minimal 1"),
});

export const AddSupplierSchema = z.object({
  name: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(100, "Maksimal 100 karakter"),
  address: z.string().min(5, "Minimal 5 karakter").max(255, "Max karakter"),
  phoneNumber: z
    .string()
    .min(10, "Minimal 10 angka")
    .max(15, "Maksimal 15 angka"),
});

export const EditSupplierSchema = z.object({
  id: z.string().min(3),
  name: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(100, "Maksimal 100 karakter"),
  address: z.string().min(5, "Minimal 5 karakter").max(255, "Max karakter"),
  phoneNumber: z
    .string()
    .min(10, "Minimal 10 Karakter")
    .max(15, "Maksimal 15 karakter"),
});

export const AddStockInSchema = z.object({
  quantity: z.number().min(1, "Minimal 1"),
  productId: z.string().min(1, "Pilih salah satu"),
  suppliersId: z.string().min(1, "pilih salah satu"),
});

export const EditStockInSchema = z.object({
  id: z.string().min(3),
  quantity: z.number().min(1, "Minimal 1"),
  productId: z.string().min(1, "Pilih salah satu"),
  suppliersId: z.string().min(1, "pilih salah satu"),
});

export const AddStockOutSchema = z.object({
  quantity: z.number().min(1, "Minimal 1"),
  destination: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(100, "Maksimal 100 karakter"),
  // status: z.enum(["Pending", "Approved", "Rejected"]).default("Pending").optional(),
  productId: z.string().min(1, "Pilih salah satu"),
});

export const EditStockOutSchema = z.object({
  id: z.string().min(3),
  quantity: z.number().min(1, "Minimal 1"),
  destination: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(100, "Maksimal 100 karakter"),
  status: z.enum(["Pending", "Approved", "Rejected"]),
  productId: z.string().min(1, "Pilih salah satu"),
});
