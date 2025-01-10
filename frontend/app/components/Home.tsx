"use client";

import Accounts from "@/app/components/Accounts";
import BarGraph from "@/app/components/BarGraph";
import Navbar from "@/app/components/Navbar";
import PieGraph from "@/app/components/PieGraph";
import Sidebar from "@/app/components/Sidebar";
import Tabs from "@/app/components/Tabs";
import TransactionForm from "@/app/components/TransactionForm";
import Transactions from "@/app/components/Transactions";
import getLastDate from "@/app/graphql/getLastDate.graphql";
import { getMonthAndYear } from "@/app/utils/getMonthAndYear";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useEffect, useState } from "react";

export default function Home() {
    const {
        data: { LastDate },
    } = useSuspenseQuery<any>(getLastDate);

    let { month: lastMonth, year: lastYear } = getMonthAndYear(LastDate);
    if (!lastYear) {
        lastYear = 1;
    }

    const [tab, setTab] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | undefined>(lastMonth!);
    const [selectedYear, setSelectedYear] = useState<number>(lastYear!);

    useEffect(() => {
        if (lastYear && selectedYear === 1) {
            setSelectedYear(lastYear);
        }
        if (lastYear === 1) {
            setSelectedYear(1);
        }
    }, [lastYear]);

    return (
        <div className=" flex flex-col-reverse md:flex-row h-screen min-h-[600px]">
            <Sidebar />
            <div className="w-full  flex flex-col p-2 flex-grow gap-2">
                <Navbar
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                />
                <Tabs
                    tab={tab}
                    setTab={setTab}
                />
                <div className="flex-grow h-[1px]  grid grid-cols-12 grid-rows-6 gap-2 overflow-hidden">
                    <div
                        className={`
                        ${tab === 1 ? "max-lg:col-span-full max-lg:md:col-span-7" : "max-lg:hidden"} 
                        bubble lg:col-span-5 row-span-3 
                        `}
                    >
                        <PieGraph
                            selectedCategory={selectedCategory}
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>
                    <div
                        className={`
                        ${tab === 1 ? "max-lg:col-span-full max-lg:md:col-span-5" : "max-lg:hidden"} 
                        bubble lg:col-span-4 row-span-3
                        `}
                    >
                        <BarGraph
                            selectedMonth={selectedMonth}
                            setSelectedMonth={setSelectedMonth}
                            selectedYear={selectedYear}
                        />
                    </div>
                    <div
                        className={`
                        ${tab === 3 ? "max-lg:col-span-full" : "max-lg:hidden"} 
                        bubble lg:col-span-3 row-span-6
                        `}
                    >
                        <Accounts />
                    </div>
                    <div
                        className={`
                        ${tab === 1 ? "max-lg:md:col-span-3 " : "max-lg:md:hidden"} 
                        ${tab === 2 ? "max-md:col-span-full" : "max-md:hidden"}
                        bubble lg:col-span-2 row-span-3 overflow-auto
                        `}
                    >
                        <TransactionForm />
                    </div>
                    <div
                        className={`
                        ${tab === 1 ? "max-lg:md:col-span-9 " : "max-lg:md:hidden"} 
                        ${tab === 2 ? "max-md:col-span-full" : "max-md:hidden"}  
                        bubble lg:col-span-7 row-span-3 overflow-x-auto overflow-y-hidden
                        `}
                    >
                        <Transactions
                            selectedCategory={selectedCategory}
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
