"use client";

import {
	ChartConfig,
	ChartContainer,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import getCategoriesQuery from "@/graphql/getCategories.graphql";
import { getRange } from "@/utils/getRange";
import { useSuspenseQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Label, Legend, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

interface PieGraphProps {
	selectedCategory: string | null;
	setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
	selectedMonth: number | undefined;
	selectedYear: number;
}

const PieGraph = ({
	selectedCategory,
	setSelectedCategory,
	selectedMonth,
	selectedYear,
}: PieGraphProps) => {
	const [activeIndex, setActiveIndex] = useState(-1);
	const {
		data: { Categories: data },
	} = useSuspenseQuery<any>(getCategoriesQuery, {
		variables: { range: getRange(selectedMonth, selectedYear) },
	});
	const transformedData = data.map(
		({ name, total }: { name: string; total: number }) => {
			return { category: name, amount: total, fill: `var(--color-${name})` };
		},
	);

	const [total, setTotal] = useState(0);

	useEffect(() => {
		const calculatedTotal = data.reduce((acc: any, item: { total: any }) => {
			return acc + item.total;
		}, 0);

		setTotal(calculatedTotal);
	}, [data]);

	const COLORS = [
		"#e6194B",
		"#f58231",
		"#ffe119",
		"#bfef45",
		"#3cb44b",
		"#42d4f4",
		"#4363d8",
		"#911eb4",
		"#f032e6",
		"#fabed4",
		"#ffd8b1",
		"#fffac8",
		"#aaffc3",
		"#469990",
		"#775ced",
		"#ffffff",
	];

	const chartConfig = transformedData.reduce(
		(acc: any, data: any, index: any) => {
			const category = data.category;
			acc[category] = {
				label: category,
				color: COLORS[index % COLORS.length],
			};
			return acc;
		},
		{},
	) satisfies ChartConfig;

	chartConfig["amount"] = { label: "Amount" };

	return (
		<ChartContainer config={chartConfig} className="h-full w-full">
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent nameKey="amount" labelKey="category" />}
				/>

				<Legend
					className="flex-wrap justify-start gap-2 sm:gap-4"
					layout="horizontal"
					align="left"
					verticalAlign="middle"
					content={<ChartLegendContent nameKey="category" />}
				/>
				<Pie
					onClick={(_, index) => {
						const categoryID = transformedData[index]?.category;
						if (selectedCategory !== categoryID) {
							setSelectedCategory(categoryID);
						} else {
							setSelectedCategory(null);
						}
						setActiveIndex(activeIndex === index ? -1 : index);
					}}
					className="hover:cursor-pointer"
					activeIndex={activeIndex}
					data={transformedData}
					dataKey="amount"
					minAngle={10}
					innerRadius={60}
					activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => {
						return (
							<Sector
								{...props}
								outerRadius={outerRadius + 10}
								style={{
									filter: `drop-shadow(0px 0px 5px ${props.fill}`,
								}}
							/>
						);
					}}
				>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-foreground text-2xl font-bold"
										>
											{selectedCategory
												? data.find(
														(cat: { name: string }) =>
															cat.name === selectedCategory,
													)?.total
												: total}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											Total
										</tspan>
									</text>
								);
							}
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
};

export default PieGraph;
