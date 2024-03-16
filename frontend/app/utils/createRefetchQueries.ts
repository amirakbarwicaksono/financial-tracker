import getCategoriesQuery from "@/app/graphql/getCategories.graphql";
import transactionsQuery from "@/app/graphql/getTransactions.graphql";
import getYears from "@/app/graphql/getYears.graphql";

import { format, lastDayOfMonth } from "date-fns";
import { enUS } from "date-fns/locale";

export const createRefetchQueries = (data: any) => {
    const updatedMonth =
        data?.deleteTransaction?.date || data?.updateTransaction?.date || data?.createTransaction?.date
            ? format(new Date(data.deleteTransaction?.date || data.updateTransaction?.date || data.createTransaction?.date), "MMM", {
                  locale: enUS,
              }).toUpperCase()
            : null;

    const updatedYear =
        data?.deleteTransaction?.date || data?.updateTransaction?.date || data?.createTransaction?.date
            ? new Date(data.deleteTransaction?.date || data.updateTransaction?.date || data.createTransaction?.date).getFullYear()
            : null;

    const startDate = `${updatedYear}-${updatedMonth}-01`;
    const endDate = `${updatedYear}-${updatedMonth}-${lastDayOfMonth(new Date(`${updatedYear}-${updatedMonth}-01`)).getDate()}`;
    return [
        { query: transactionsQuery, variables: { range: { startDate: `${updatedYear}-01-01`, endDate: `${updatedYear}-12-31` } } },
        { query: getCategoriesQuery, variables: { range: { startDate: `${updatedYear}-01-01`, endDate: `${updatedYear}-12-31` } } },
        { query: getCategoriesQuery, variables: { range: { startDate, endDate } } },
        { query: getYears },
    ];
};
