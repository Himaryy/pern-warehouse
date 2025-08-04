// src/lib/dummyData.js
// Static dummy data you can import anywhere without hitting the DB

export const products = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    name: "Wireless Mouse",
    stock: 120,
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-2345678901bc",
    name: "Mechanical Keyboard",
    stock: 75,
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-3456789012cd",
    name: "27-inch Monitor",
    stock: 40,
  },
];

export const suppliers = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "TechSupply Co.",
    address: "123 Silicon St, CA",
    phoneNumber: "555-0101",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Global Gadgets",
    address: "456 Factory Rd, NY",
    phoneNumber: "555-0202",
  },
];

export const stockIn = [
  {
    id: "in-1",
    productId: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    suppliersId: "11111111-1111-1111-1111-111111111111",
    quantity: 50,
    createdAt: "2024-05-01T08:00:00Z",
  },
  {
    id: "in-2",
    productId: "b2c3d4e5-f6a7-8901-bcde-2345678901bc",
    suppliersId: "11111111-1111-1111-1111-111111111111",
    quantity: 30,
    createdAt: "2024-05-03T10:30:00Z",
  },
  {
    id: "in-3",
    productId: "c3d4e5f6-a7b8-9012-cdef-3456789012cd",
    suppliersId: "22222222-2222-2222-2222-222222222222",
    quantity: 20,
    createdAt: "2024-05-05T09:15:00Z",
  },
];

export const stockOut = [
  {
    id: "out-1",
    productId: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    quantity: 10,
    destination: "HQ Office",
    status: "Approved",
    createdAt: "2024-05-02T14:00:00Z",
  },
  {
    id: "out-2",
    productId: "b2c3d4e5-f6a7-8901-bcde-2345678901bc",
    quantity: 5,
    destination: "Remote Team",
    status: "Pending",
    createdAt: "2024-05-04T11:00:00Z",
  },
  {
    id: "out-3",
    productId: "c3d4e5f6-a7b8-9012-cdef-3456789012cd",
    quantity: 2,
    destination: "Client Showcase",
    status: "Approved",
    createdAt: "2024-05-06T16:45:00Z",
  },
];
