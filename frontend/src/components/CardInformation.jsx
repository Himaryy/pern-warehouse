import React from "react";

const CardInformation = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
      <div className="flex flex-col gap-2w-full bg-gray-800/60 backdrop-blur border border-gray-700/40 rounded-xl shadow-lg p-4">
        <p className="text-sm font-semibold text-white">Total Products</p>
        <p className="text-3xl text-white font-bold">180</p>
      </div>

      <div className="flex flex-col gap-2w-full bg-gray-800/60 backdrop-blur border border-gray-700/40 rounded-xl shadow-lg p-4">
        <p className="text-sm font-semibold text-white">Stock In</p>
        <p className="text-3xl text-white font-bold">300</p>
      </div>

      <div className="flex flex-col gap-2w-full bg-gray-800/60 backdrop-blur border border-gray-700/40 rounded-xl shadow-lg p-4">
        <p className="text-sm font-semibold text-white">Stock Out</p>
        <p className="text-3xl text-white font-bold">80</p>
      </div>

      <div className="flex flex-col gap-2w-full bg-gray-800/60 backdrop-blur border border-gray-700/40 rounded-xl shadow-lg p-4">
        <p className="text-sm font-semibold text-white">Total Suppliers</p>
        <p className="text-3xl text-white font-bold">15</p>
      </div>
    </div>
  );
};

export default CardInformation;
