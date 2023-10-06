"use client";
import { useState } from "react";
import Accounts from "./components/Accounts";
import BarGraph from "./components/BarGraph";
import Navbar from "./components/Navbar";
import PieGraph from "./components/PieGraph";
import Sidebar from "./components/Sidebar";
import Tabs from "./components/Tabs";
import TransactionForm from "./components/TransactionForm";
import Transactions from "./components/Transactions";

export default function Home() {
    const [tab, setTab] = useState(1);

    return (
        <div className="flex flex-col-reverse md:flex-row h-screen">
            <Sidebar />
            <div className="w-full  flex flex-col p-2 flex-grow gap-2">
                <Navbar />
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
                        <PieGraph />
                    </div>
                    <div
                        className={`
                        ${tab === 1 ? "max-lg:col-span-full max-lg:md:col-span-5" : "max-lg:hidden"} 
                        bubble lg:col-span-4 row-span-3
                        `}
                    >
                        <BarGraph />
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
                        <Transactions />
                    </div>
                </div>
            </div>
        </div>
    );
}
