"use client";

import { useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { dimmedColor } from "../utils/dimmedColor";

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

const BarGraph = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [hoverIndex, setHoverIndex] = useState(-1);

    const data = [
        { month: "JAN", amount: 5430 },
        { month: "FEB", amount: 6050 },
        { month: "MAR", amount: 5150 },
        { month: "APR", amount: 7165 },
        { month: "MAY", amount: 6330 },
        { month: "JUN", amount: 8127 },
        { month: "JUL", amount: 5430 },
        { month: "AUG", amount: 6050 },
        { month: "SEP", amount: 5150 },
        { month: "OCT", amount: 7165 },
        { month: "NOV", amount: 6330 },
        { month: "DEC", amount: 8127 },
    ];
    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <BarChart data={data}>
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
                    onClick={(_, index) => (activeIndex === index ? setActiveIndex(-1) : setActiveIndex(index))}
                    dataKey="amount"
                >
                    {data.map((_, index) => (
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
