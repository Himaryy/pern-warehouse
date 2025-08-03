import React from "react";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FaBoxes } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { AiOutlineShop } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { GoPackageDependencies, GoPackageDependents } from "react-icons/go";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen sticky top-0 flex flex-col px-4">
      <div className="py-6 text-white text-2xl flex items-center gap-2">
        <span>
          <TbBuildingWarehouse />
        </span>{" "}
        StockMaster
      </div>

      <nav className="flex flex-col gap-2">
        {/* Home */}
        <Link
          to={"/"}
          className="flex items-center gap-2 py-3 px-2 border-b border-gray-400/50 transition-colors hover:border-none rounded-xs duration-500 hover:bg-green-500 hover:rounded-md hover:text-black"
        >
          <ImHome className="size-5" />
          <div className="font-base">Home</div>
        </Link>

        {/* Stock */}
        <div className="flex items-center justify-start px-2 gap-2 border-b border-gray-400/50">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="stock-in">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex gap-2">
                  <GoPackage className="size-5" />
                  <h2 className="text-base">Stocks</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <Link className="text-base font-semibold pl-6">
                    <div
                      className={`flex items-center gap-2 hover:bg-green-500 p-2 rounded-md hover:text-black transition-colors duration-500 ${
                        location.pathname === "/stock-in" ? "bg-green-500" : ""
                      }`}
                    >
                      <span>
                        <GoPackageDependencies className="size-5" />
                      </span>
                      <div className="font-base">Stock In</div>
                    </div>
                  </Link>
                  <Link className="text-base font-semibold pl-6">
                    <div
                      className={`flex items-center gap-2 hover:bg-green-500 p-2 rounded-md hover:text-black transition-colors duration-500 ${
                        location.pathname === "/stock-out" ? "bg-green-500" : ""
                      }`}
                    >
                      <span>
                        <GoPackageDependents className="size-5" />
                      </span>
                      <div className="font-base">Stock Out</div>
                    </div>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Products */}
        <Link className="flex items-center gap-2 py-3 px-2 border-b border-gray-400/50 transition-colors hover:border-none rounded-xs duration-500 hover:bg-green-500 hover:rounded-md hover:text-black">
          <FaBoxes className="size-5" />
          <div className="font-base">Products</div>
        </Link>

        {/* Suppliers */}
        <Link
          to={"/suppliers"}
          className="flex items-center gap-2 py-3 px-2 border-b border-gray-400/50 transition-colors hover:border-none rounded-xs duration-500 hover:bg-green-500 hover:rounded-md hover:text-black"
        >
          <AiOutlineShop className="size-6" />
          <div className="font-base">Suppliers</div>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
