import React from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", stockIn: 186, stockOut: 80 },
  { month: "February", stockIn: 305, stockOut: 200 },
  { month: "March", stockIn: 237, stockOut: 120 },
  { month: "April", stockIn: 73, stockOut: 190 },
  { month: "May", stockIn: 209, stockOut: 130 },
  { month: "June", stockIn: 214, stockOut: 140 },
];

const chartConfig = {
  stockIn: {
    label: "Stock In",
    // color: "var(--chart-1)",
  },
  stockOut: {
    label: "Stock Out",
    // color: "var(--chart-2)",
  },
};

export default function ChartInformation() {
  return (
    <Card
      className={`w-full bg-gray-800/60 backdrop-blur border border-gray-700/40 rounded-xl shadow-lg`}
    >
      <CardHeader>
        <CardTitle className="text-gray-100 font-heading font-semibold">
          Inventory Traffic
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm">
          Showing total stock in/out in month
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className={`h-64 w-full`}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Area
              dataKey="stockOut"
              type="natural"
              fill="hsl(200 60% 50% / 0.35)" /* muted sky */
              stroke="hsl(200 60% 60%)"
              fillOpacity={0.4}
              stackId="a"
            />
            <Area
              dataKey="stockIn"
              type="natural"
              fill="hsl(150 60% 45% / 0.35)" /* muted emerald */
              stroke="hsl(150 60% 55%)"
              fillOpacity={0.4}
              stackId="a"
            />

            <ChartLegend
              content={<ChartLegendContent />}
              className="text-gray-500"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
