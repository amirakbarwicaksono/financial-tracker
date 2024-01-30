"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { dimmedColor } from "../utils/dimmedColor";

import query from "../graphql/getTransactions.graphql";

type DataPoint = {
    month: string;
    amount: number;
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
                <p>{`Month: ${label}`}</p>
                <p>{`Amount: ${data.amount}`}</p>
            </div>
        );
    }

    return null;
};

interface BarGraphProps {
    selectedMonth: string | null;
    setSelectedMonth: React.Dispatch<React.SetStateAction<string | null>>;
}

const BarGraph = ({ selectedMonth, setSelectedMonth }: BarGraphProps) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [hoverIndex, setHoverIndex] = useState(-1);

    const {
        data: { Transactions: data },
    } = useSuspenseQuery<any>(query);

    // Step 1: Parse the input data
    const parsedData = data.map(({ date, amount }: { date: string; amount: number }) => ({
        month: new Date(date).toLocaleString("en-US", { month: "short" }).toUpperCase(),
        amount,
    }));

    // Step 2: Group the data by month
    const groupedData = parsedData.reduce((acc: { [x: string]: any }, entry: { month: any; amount: any }) => {
        const { month, amount } = entry;
        acc[month] = (acc[month] || 0) + amount;
        return acc;
    }, {});

    // Step 3: Transform the grouped data into the desired format
    const resultData = Object.keys(groupedData)
        .map((month) => ({ month, amount: groupedData[month] }))
        .sort((a, b) => new Date(`2000-${a.month}-01`)!.getTime() - new Date(`2000-${b.month}-01`)!.getTime());

    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <BarChart data={resultData}>
                <XAxis
                    dataKey="month"
                    stroke="currentColor"
                />
                <YAxis stroke="currentColor" />
                <Tooltip
                    cursor={false}
                    content={<CustomTooltip />}
                />
                <Bar
                    onMouseOver={(_, index) => setHoverIndex(index)}
                    onMouseOut={(_, index) => setHoverIndex(-1)}
                    onClick={(_, index) => {
                        const month = resultData[index]?.month;
                        if (selectedMonth !== month) {
                            setSelectedMonth(month);
                        } else {
                            setSelectedMonth(null);
                        }
                        setActiveIndex(activeIndex === index ? -1 : index);
                    }}
                    // onClick={(_, index) => (activeIndex === index ? setActiveIndex(-1) : setActiveIndex(index))}
                    dataKey="amount"
                >
                    {resultData.map((_, index) => (
                        <Cell
                            className="hover:stroke-neutral-200 stroke-none cursor-pointer"
                            style={{
                                filter: index === activeIndex ? `drop-shadow(0px 0px 5px #ec4899` : "none",
                            }}
                            key={`cell-${index}`}
                            fill={index === activeIndex ? "#ec4899" : dimmedColor("#ec4899")}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarGraph;
