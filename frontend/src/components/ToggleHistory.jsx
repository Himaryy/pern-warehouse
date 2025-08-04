import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleHistory({ value, onValueChange }) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={onValueChange}
      className={`bg-gray-800/50 text-gray-100 border border-gray-700/40`}
    >
      <ToggleGroupItem
        value="stockIn"
        aria-label="Stock In"
        className={`transition-colors duration-300 hover:bg-green-500 hover:text-black data-[state=on]:bg-green-500 data-[state=on]:text-black`}
      >
        <p className="px-2">Stock In</p>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="stockOut"
        aria-label="Stock Out"
        className={`transition-colors duration-300 hover:bg-green-500 hover:text-black data-[state=on]:bg-green-500 data-[state=on]:text-black`}
      >
        <p className="px-2">Stock Out</p>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
