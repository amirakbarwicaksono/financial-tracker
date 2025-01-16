"use client";

import Accounts from "@/components/dashboard/Accounts";
import BarGraph from "@/components/dashboard/BarGraph";
import Navbar from "@/components/dashboard/Navbar";
import PieGraph from "@/components/dashboard/PieGraph";
import Sidebar from "@/components/dashboard/Sidebar";
import Tabs from "@/components/dashboard/Tabs";
import TransactionForm from "@/components/dashboard/TransactionForm";
import { columns } from "@/components/dashboard/transactions/columns";
import { DataTable } from "@/components/dashboard/transactions/DataTable";
import getLastDate from "@/graphql/getLastDate.graphql";
import transactionsQuery from "@/graphql/getTransactions.graphql";
import { getMonthAndYear } from "@/utils/getMonthAndYear";
import { getRange } from "@/utils/getRange";
import { useSuspenseQuery } from "@apollo/client";
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
	const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
		lastMonth!,
	);
	const [selectedYear, setSelectedYear] = useState<number>(lastYear!);

	const {
		data: { Transactions: data },
	} = useSuspenseQuery<any>(transactionsQuery, {
		variables: { range: getRange(selectedMonth, selectedYear) },
	});
	const transformedData = selectedCategory
		? data.filter(
				(transaction) => transaction.category.name === selectedCategory,
			)
		: data;

	useEffect(() => {
		if (lastYear && selectedYear === 1) {
			setSelectedYear(lastYear);
		}
		if (lastYear === 1) {
			setSelectedYear(1);
		}
	}, [lastYear, selectedYear]);

	return (
		<div className="flex h-screen min-h-[600px] flex-col-reverse md:flex-row">
			<Sidebar />
			<div className="flex w-full flex-grow flex-col gap-2 p-2">
				<Navbar selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
				<Tabs tab={tab} setTab={setTab} />
				<div className="grid h-[1px] flex-grow grid-cols-12 grid-rows-6 gap-2 overflow-hidden">
					<div
						className={` ${tab === 1 ? "max-lg:col-span-full max-lg:md:col-span-7" : "max-lg:hidden"} bubble row-span-3 lg:col-span-5`}
					>
						<PieGraph
							selectedCategory={selectedCategory}
							selectedMonth={selectedMonth}
							selectedYear={selectedYear}
							setSelectedCategory={setSelectedCategory}
						/>
					</div>
					<div
						className={` ${tab === 1 ? "max-lg:col-span-full max-lg:md:col-span-5" : "max-lg:hidden"} bubble row-span-3 lg:col-span-4`}
					>
						<BarGraph
							selectedMonth={selectedMonth}
							setSelectedMonth={setSelectedMonth}
							selectedYear={selectedYear}
						/>
					</div>
					<div
						className={` ${tab === 3 ? "max-lg:col-span-full" : "max-lg:hidden"} bubble row-span-6 lg:col-span-3`}
					>
						<Accounts />
					</div>
					<div
						className={` ${tab === 1 ? "max-lg:md:col-span-3" : "max-lg:md:hidden"} ${tab === 2 ? "max-md:col-span-full" : "max-md:hidden"} bubble row-span-3 overflow-auto lg:col-span-2`}
					>
						<TransactionForm />
					</div>
					<div
						className={` ${tab === 1 ? "max-lg:md:col-span-9" : "max-lg:md:hidden"} ${tab === 2 ? "max-md:col-span-full" : "max-md:hidden"} bubble row-span-3 lg:col-span-7`}
					>
						<DataTable columns={columns} data={transformedData} />
					</div>
				</div>
			</div>
		</div>
	);
}
