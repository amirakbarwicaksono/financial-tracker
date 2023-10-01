"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
            <div className="bubble border-thin">
                <p>{`Month: ${label}`}</p>
                <p>{`Amount: ${data.amount}`}</p>
            </div>
        );
    }

    return null;
};

const BarGraph = () => {
    const data = [
        { month: "JAN", amount: 5430 },
        { month: "FEB", amount: 6050 },
        { month: "MAR", amount: 5150 },
        { month: "APR", amount: 7165 },
        { month: "MAY", amount: 6330 },
        { month: "JUN", amount: 8127 },
    ];
    return (
        <div className="bubble col-span-5 row-span-3">
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
                        dataKey="amount"
                        fill="#ec4899"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarGraph;
