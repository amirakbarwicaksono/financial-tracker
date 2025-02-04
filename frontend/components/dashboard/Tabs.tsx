"use client";

import { useRouter } from "next/navigation";

type TabsProps = {
	tab: number;
	selectedYear: number;
	selectedCategory: string | undefined;
	selectedMonth: number | undefined;
	selectedDate: string;
};

const Tabs = ({
	tab,
	selectedYear,
	selectedMonth,
	selectedCategory,
	selectedDate,
}: TabsProps) => {
	const router = useRouter();
	const handleClick = (tab: number) => {
		router.push(
			`/home?year=${selectedYear}${selectedMonth !== undefined ? `&month=${selectedMonth + 1}` : ""}${selectedCategory ? `&category=${selectedCategory}` : ""}&tab=${tab}&date=${selectedDate}`,
		);
	};
	return (
		<div className="bubble flex h-6 items-center justify-around !p-0 lg:hidden">
			<div
				onClick={() => handleClick(1)}
				className={`tabs rounded-l-lg lg:hidden ${tab === 1 ? "tab-active" : "tab-inactive"}`}
			>
				Home
			</div>
			<div
				onClick={() => handleClick(2)}
				className={`tabs md:hidden ${tab === 2 ? "tab-active" : "tab-inactive"}`}
			>
				Transactions
			</div>
			<div
				onClick={() => handleClick(3)}
				className={`tabs rounded-r-lg lg:hidden ${tab === 3 ? "tab-active" : "tab-inactive"}`}
			>
				Day Data
			</div>
		</div>
	);
};

export default Tabs;
