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
import getYearlyData from "@/graphql/getYearlyData.graphql";
import { getClient } from "@/lib/client";
import { getMonthAndYear } from "@/utils/getMonthAndYear";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { getRange } from "../../utils/getRange";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const userData = user?.user_metadata;

	const apollo = getClient();
	const { year, month, category, tab = 1 } = await searchParams;

	let selectedYear, selectedMonth;
	if (!year) {
		const {
			data: { LastDate },
		} = await apollo.query({ query: getLastDate });
		const { month, year } = getMonthAndYear(LastDate);
		selectedYear = year ? year : 1;
		selectedMonth = month ?? undefined;
	} else {
		selectedYear = Number(year);
		selectedMonth =
			month && Number(month) >= 1 && Number(month) <= 12
				? Number(month) - 1
				: undefined;
	}

	const selectedCategory = category;
	const selectedTab = Number(tab);

	// const {
	// 	data: { session },
	// } = await supabase.auth.getSession();
	// console.log(session?.access_token);

	const {
		data: { TransactionsByMonth: d, Categories, Years },
	} = await apollo.query({
		query: getYearlyData,
		variables: { year: selectedYear, range: getRange(undefined, selectedYear) },
	});

	const selectedCategoryId = Categories.find(
		(cat) => cat.name === selectedCategory,
	)?.id;

	const categoryTotals = Categories.map((category) => {
		return {
			category: category.name,
			amount:
				selectedMonth !== undefined
					? (d[selectedMonth].categories.find(
							(cat) => cat.name === category.name,
						)?.total ?? 0)
					: (category.total ?? 0),
			fill: `var(--color-${category.name})`,
		};
	});

	const total =
		selectedMonth !== undefined && selectedCategory
			? d[selectedMonth].categories.find((cat) => cat.name === selectedCategory)
					?.total
			: selectedMonth !== undefined
				? d[selectedMonth].total
				: selectedCategory
					? Categories.find((cat) => cat.name === selectedCategory).total
					: d.reduce((acc, month) => acc + month.total, 0);

	const transactions =
		selectedMonth !== undefined && selectedCategory
			? (d[selectedMonth].categories.find(
					(cat) => cat.name === selectedCategory,
				)?.transactions ?? [])
			: selectedMonth !== undefined
				? d[selectedMonth].categories.flatMap((cat) => cat.transactions)
				: selectedCategory
					? d.flatMap(
							(month) =>
								month.categories.find((cat) => cat.name === selectedCategory)
									?.transactions ?? [],
						)
					: d.flatMap((month) =>
							month.categories.flatMap((cat) => cat.transactions),
						);
	const monthly = d.map((month, index) => {
		return {
			month: format(new Date(1990, index, 1), "MMMM"),
			amount: selectedCategory
				? (month.categories.find((cat) => cat.name === selectedCategory)
						?.total ?? 0)
				: month.total,
		};
	});

	return (
		<div className="flex h-screen min-h-[600px] flex-col-reverse md:flex-row">
			<Sidebar />
			<div className="flex w-full flex-grow flex-col gap-2 p-2">
				<Navbar
					userData={userData}
					data={Years}
					selectedYear={selectedYear}
					selectedCategory={selectedCategory}
					selectedMonth={selectedMonth}
				/>
				<Tabs tab={selectedTab} />
				<div className="grid h-[1px] flex-grow grid-cols-12 grid-rows-6 gap-2 overflow-hidden">
					<div
						className={` ${selectedTab === 1 ? "max-lg:col-span-full max-lg:md:col-span-7" : "max-lg:hidden"} bubble row-span-3 lg:col-span-5`}
					>
						<PieGraph
							data={categoryTotals}
							total={total}
							activeIndex={selectedCategory ? selectedCategoryId - 1 : -1}
							selectedCategory={selectedCategory}
							selectedMonth={selectedMonth}
							selectedYear={selectedYear}
						/>
					</div>
					<div
						className={` ${selectedTab === 1 ? "max-lg:col-span-full max-lg:md:col-span-5" : "max-lg:hidden"} bubble row-span-3 lg:col-span-4`}
					>
						<BarGraph
							selectedMonth={selectedMonth}
							selectedYear={selectedYear}
							selectedCategory={selectedCategory}
							monthlySummary={monthly}
						/>
					</div>
					<div
						className={` ${selectedTab === 3 ? "max-lg:col-span-full" : "max-lg:hidden"} bubble row-span-6 lg:col-span-3`}
					>
						<Accounts />
					</div>
					<div
						className={` ${selectedTab === 1 ? "max-lg:md:col-span-3" : "max-lg:md:hidden"} ${selectedTab === 2 ? "max-md:col-span-full" : "max-md:hidden"} bubble row-span-3 overflow-auto lg:col-span-2`}
					>
						<TransactionForm data={Categories} />
					</div>
					<div
						className={` ${selectedTab === 1 ? "max-lg:md:col-span-9" : "max-lg:md:hidden"} ${selectedTab === 2 ? "max-md:col-span-full" : "max-md:hidden"} bubble row-span-3 lg:col-span-7`}
					>
						<DataTable columns={columns} data={transactions} />
					</div>
				</div>
			</div>
		</div>
	);
}
