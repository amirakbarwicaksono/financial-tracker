"use client";

import { useState } from "react";
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { dimmedColor } from "../utils/dimmedColor";

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

const PieGraph = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    // const [hoverIndex, setHoverIndex] = useState(-1);

    const data = [
        { name: "Grocery", value: 5343 },
        { name: "Education", value: 100 },
        { name: "Health", value: 2324 },
        { name: "Miscellaneous", value: 1412 },
        { name: "Food", value: 100 },
        { name: "Transportation", value: 1200 },
        { name: "Personal", value: 265 },
        { name: "Entertainment", value: 200 },
        { name: "Tax", value: 1000 },
        { name: "Utility", value: 2254 },
        { name: "Rent", value: 20 },
        { name: "Debt", value: 10 },
        { name: "Gift", value: 200 },
        { name: "Insurance", value: 500 },
        { name: "Electronics", value: 200 },
        { name: "Repair", value: 700 },
    ];
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
                    width={250}
                    layout="horizontal"
                    align="left"
                    verticalAlign="middle"
                    iconType="line"
                />
                <Pie
                    minAngle={10}
                    data={data}
                    cx={"50%"}
                    cy={"50%"}
                    innerRadius={80}
                    outerRadius={100}
                    fill="#888a2s"
                    paddingAngle={0}
                    dataKey="value"
                    onClick={(_, index) => (activeIndex === index ? setActiveIndex(-1) : setActiveIndex(index))}
                >
                    {data.map((_, index) => (
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
                        value="100112"
                        position="center"
                    />
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieGraph;
