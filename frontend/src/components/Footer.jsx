import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900/70 border-t border-gray-700/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center gap-2">
        <p className="font-sans text-xs text-gray-300">
          © {new Date().getFullYear()} StockMaster
        </p>
        <p className="font-sans text-xs text-gray-500">
          Built with ❤️ for modern warehouses
        </p>
      </div>
    </footer>
  );
};

export default Footer;
