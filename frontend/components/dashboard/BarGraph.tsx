"use client";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import query from "@/graphql/getTransactions.graphql";
import { cn } from "@/utils/conditional";
import { getRange } from "@/utils/getRange";
import { useSuspenseQuery } from "@apollo/client";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

interface BarGraphProps {
	selectedMonth: number | undefined;
	setSelectedMonth: React.Dispatch<React.SetStateAction<number | undefined>>;
	selectedYear: number;
}

const BarGraph = ({
	selectedMonth,
	setSelectedMonth,
	selectedYear,
}: BarGraphProps) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const {
		data: { Transactions: data },
	} = useSuspenseQuery<any>(query, {
		variables: { range: getRange(undefined, selectedYear) },
	});

	// Step 1: Parse the input data
	const parsedData = data.map(
		({ date, amount }: { date: string; amount: number }) => ({
			month: new Date(date).toLocaleString("en-US", { month: "long" }),
			amount,
		}),
	);

	// Step 2: Group the data by month
	const accumulator: { [key: string]: number } = {};
	months.forEach((month) => (accumulator[month] = 0));

	const groupedData = parsedData.reduce(
		(acc: { [x: string]: any }, entry: { month: any; amount: any }) => {
			const { month, amount } = entry;
			acc[month] = (acc[month] || 0) + amount;
			return acc;
		},
		accumulator,
	);

	// Step 3: Transform the grouped data into the desired format
	const resultData = Object.keys(groupedData).map((month) => ({
		month,
		amount: groupedData[month],
	}));

	const chartConfig = { amount: { label: "Amount" } } satisfies ChartConfig;

	const chartColor = "hsl(var(--primary))";

	return (
		<ChartContainer config={chartConfig} className="h-full w-full">
			<BarChart accessibilityLayer data={resultData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>

				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
				/>

				<Bar
					onClick={(_, index) => {
						if (selectedMonth !== index) {
							setSelectedMonth(index);
						} else {
							setSelectedMonth(undefined);
						}
					}}
					activeIndex={selectedMonth}
					className="hover:cursor-pointer"
					activeBar={({ ...props }) => {
						return (
							<Rectangle
								{...props}
								className={cn(
									props.index === selectedMonth &&
										"fill-chart-4 drop-shadow-[0_0_5px_hsl(var(--chart-4))]",
								)}
							/>
						);
					}}
					dataKey="amount"
					radius={[8, 8, 0, 0]}
					fill={chartColor}
				/>
			</BarChart>
		</ChartContainer>
	);
};

export default BarGraph;
