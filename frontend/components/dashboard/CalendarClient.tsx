"use client";

import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface CalendarClientProps {
	selectedYear: number;
	selectedMonth: number | undefined;
	selectedCategory: string | undefined;
	selectedTab: number;
	selectedDate: string;
}

const CalendarClient = ({
	selectedYear,
	selectedMonth,
	selectedCategory,
	selectedTab,
	selectedDate,
}: CalendarClientProps) => {
	const router = useRouter();
	return (
		<Calendar
			id="calendar"
			mode="single"
			selected={new Date(selectedDate)}
			onSelect={(date) =>
				router.push(
					`/home?year=${selectedYear}${selectedMonth !== undefined ? `&month=${selectedMonth + 1}` : ""}${selectedCategory ? `&category=${selectedCategory}` : ""}&tab=${selectedTab}&date=${format(date!, "yyyy-MM-dd")}`,
				)
			}
			disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
			className="rounded-md border"
		/>
	);
};

export default CalendarClient;
