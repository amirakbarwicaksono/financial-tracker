import { lastDayOfMonth } from "date-fns";

export const getRange = (month: String | null, year: number) => {
    const startDate = month ? `${year}-${month}-01` : `${year}-JAN-01`;
    const endDate = month ? `${year}-${month}-${lastDayOfMonth(new Date(`${year}-${month}-01`)).getDate()}` : `${year}-DEC-31`;
    return { startDate, endDate };
};
