import React, { useMemo } from "react";
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

const chartConfig = {
  stockOut: {
    label: "Stock Out",
    // color: "var(--chart-1)",
  },
  stockIn: {
    label: "Stock In",
    // color: "var(--chart-2)",
  },
};
// {data=[]}
export default function ChartInformation({ data = [] }) {
  const sorted = useMemo(() => {
    const monthOrder = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };

    return [...data].sort((a, b) => {
      const [aM, aY] = a.month.split("-");
      const [bM, bY] = b.month.split("-");
      return (
        (Number(aY) - Number(bY)) * 100 + (monthOrder[aM] - monthOrder[bM])
      );
    });
  }, [data]);
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
            data={sorted}
            // data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
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
