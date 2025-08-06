import React, { useContext, useEffect } from "react";
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
import { AppContext } from "@/context/AppContext";

const Sidebar = () => {
  const { isActive } = useContext(AppContext);

  return (
    <aside className="w-64 bg-gray-800/60 text-white h-screen sticky top-0 flex flex-col px-4">
      <div className="text-white text-2xl flex items-center gap-2 border-b border-gray-500/50 py-2 pt-6">
        <span>
          <TbBuildingWarehouse />
        </span>{" "}
        StockMaster
      </div>

      <nav className="flex flex-col gap-2 mt-4">
        {/* Home */}
        <Link
          to="/"
          className={`flex items-center gap-2 py-3 px-2 transition-colors rounded-md hover:border-none duration-500 hover:bg-green-500  hover:text-black ${
            isActive("/") ? "bg-green-500 text-black" : ""
          }`}
        >
          <ImHome className="size-5" />
          <div className="font-base">Home</div>
        </Link>

        {/* Stock */}
        <div className="flex items-center justify-start px-2 gap-2 ">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="stock-in">
              <AccordionTrigger className="hover:no-underline cursor-pointer">
                <div className="flex gap-2">
                  <GoPackage className="size-5" />
                  <h2 className="text-base">Stocks</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <Link
                    to={"/stock-in"}
                    className="text-base font-semibold pl-6"
                  >
                    <div
                      className={`flex items-center gap-2 hover:bg-green-500 p-2 rounded-md hover:text-black transition-colors duration-500  ${
                        isActive("/stock-in") ? "bg-green-500 text-black" : ""
                      }`}
                    >
                      <span>
                        <GoPackageDependencies className="size-5" />
                      </span>
                      <div className="font-base">Stock In</div>
                    </div>
                  </Link>
                  <Link
                    to={"/stock-out"}
                    className="text-base font-semibold pl-6"
                  >
                    <div
                      className={`flex items-center gap-2 hover:bg-green-500 p-2 rounded-md hover:text-black transition-colors duration-500  ${
                        isActive("/stock-out") ? "bg-green-500 text-black" : ""
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
        <Link
          to={"/products"}
          className={`flex items-center gap-2 py-3 px-2 transition-colors hover:border-none duration-500 hover:bg-green-500 rounded-md hover:text-black  ${
            isActive("/products") ? "bg-green-500 text-black" : ""
          }`}
        >
          <FaBoxes className="size-5" />
          <div className="font-base">Products</div>
        </Link>

        {/* Suppliers */}
        <Link
          to={"/suppliers"}
          className={`flex items-center gap-2 py-3 px-2 transition-colors hover:border-none duration-500 hover:bg-green-500 rounded-md hover:text-black ${
            isActive("/suppliers") ? "bg-green-500 text-black" : ""
          } `}
        >
          <AiOutlineShop className="size-6" />
          <div className="font-base">Suppliers</div>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
