import CalendarClient from "@/components/dashboard/CalendarClient";
import { Transaction } from "@/types/types";

interface DayDataProps {
	total: number;
	transactions: Transaction[];
	selectedYear: number;
	selectedMonth: number | undefined;
	selectedCategory: string | undefined;
	selectedTab: number;
	selectedDate: string;
}

const DayData = ({
	total,
	transactions,
	selectedYear,
	selectedMonth,
	selectedCategory,
	selectedTab,
	selectedDate,
}: DayDataProps) => {
	const formattedTotal = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(total);

	transactions.sort((a, b) => b.amount - a.amount);

	return (
		<div className="flex h-full flex-col gap-2">
			<CalendarClient
				selectedYear={selectedYear}
				selectedCategory={selectedCategory}
				selectedMonth={selectedMonth}
				selectedDate={selectedDate}
				selectedTab={selectedTab}
			/>
			<div className="flex-grow rounded-md border p-3">
				<div className="flex h-full flex-col justify-between">
					<div className="hidden text-center text-sm text-muted-foreground md:block">
						Summary
					</div>
					<div className="text-center text-5xl font-semibold">
						{formattedTotal}
					</div>
					<div className="text-center text-muted-foreground">
						{transactions.length > 0
							? `Biggest Spend: ${transactions[0].item
									.split(" ")
									.map(
										(word) =>
											word.charAt(0).toUpperCase() +
											word.slice(1).toLowerCase(),
									)
									.join(" ")} ${new Intl.NumberFormat("en-IN", {
									style: "currency",
									currency: "INR",
								}).format(transactions[0].amount)}`
							: "No Transactions"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DayData;
