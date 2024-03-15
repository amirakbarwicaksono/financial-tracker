"use client";

import getCategoriesQuery from "@/app/graphql/getCategories.graphql";
import { dimmedColor } from "@/app/utils/dimmedColor";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { lastDayOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type DataPoint = {
    name: string;
    value: number;
};

const CustomTooltip: React.FC<{
    active?: boolean;
    payload?: Array<{ payload: DataPoint }>;
    label?: string;
}> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="tooltip">
                <p>{`Category: ${data.name}`}</p>
                <p>{`Amount: ${data.value}`}</p>
            </div>
        );
    }

    return null;
};

interface PieGraphProps {
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    selectedMonth: string | null;
}

const PieGraph = ({ selectedCategory, setSelectedCategory, selectedMonth }: PieGraphProps) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const year = 2024;
    const startDate = `${year}-${selectedMonth}-01`;
    const endDate = `${year}-${selectedMonth}-${lastDayOfMonth(new Date(`${year}-${selectedMonth}-01`)).getDate()}`;

    const {
        data: { Categories: data },
    } = useSuspenseQuery<any>(getCategoriesQuery, {
        variables: selectedMonth ? { range: { startDate, endDate } } : {},
    });

    const transformedData = data.map(({ name, total }: { name: string; total: number }) => {
        return { name, value: total };
    });

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

    const calculateColor = (index: number) => {
        const originalColor = COLORS[index % COLORS.length];
        if (index === activeIndex) {
            return originalColor;
        }
        return dimmedColor(originalColor);
    };

    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    layout="horizontal"
                    align="left"
                    verticalAlign="middle"
                    iconType="line"
                />
                <Pie
                    minAngle={10}
                    data={transformedData}
                    cx={"50%"}
                    cy={"50%"}
                    innerRadius={"65%"}
                    outerRadius={"85%"}
                    fill="#888a2s"
                    paddingAngle={0}
                    dataKey="value"
                    onClick={(_, index) => {
                        const categoryID = transformedData[index]?.name;
                        if (selectedCategory !== categoryID) {
                            setSelectedCategory(categoryID);
                        } else {
                            setSelectedCategory(null);
                        }
                        setActiveIndex(activeIndex === index ? -1 : index);
                    }}
                >
                    {transformedData.map((_: any, index: number) => (
                        <Cell
                            className={`hover:stroke-neutral-200 stroke-none  outline-none cursor-pointer`}
                            style={{
                                filter: index === activeIndex ? `drop-shadow(0px 0px 5px ${COLORS[index % COLORS.length]}` : "none",
                            }}
                            key={`cell-${index}`}
                            fill={calculateColor(index)}
                        />
                    ))}

                    <Label
                        fill="#e5e5e5"
                        value={selectedCategory ? data.find((cat: { name: string }) => cat.name === selectedCategory)?.total : total}
                        position="center"
                    />
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieGraph;
