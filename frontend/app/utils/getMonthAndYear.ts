import { format, getYear } from "date-fns";
import { enUS } from "date-fns/locale";

interface MonthAndYear {
    month: string | null;
    year: number | null;
}

export const getMonthAndYear = (dateString?: string): MonthAndYear => {
    if (!dateString) {
        return { month: null, year: null };
    }

    const date = new Date(dateString);
    return {
        month: format(date, "MMM", { locale: enUS }).toUpperCase(),
        year: getYear(date),
    };
};
