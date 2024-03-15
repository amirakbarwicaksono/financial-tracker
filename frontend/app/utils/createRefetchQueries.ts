import getCategoriesQuery from "@/app/graphql/getCategories.graphql";
import transactionsQuery from "@/app/graphql/getTransactions.graphql";
import { format, lastDayOfMonth } from "date-fns";
import { enUS } from "date-fns/locale";

export const createRefetchQueries = (data: any) => {
    const updatedMonth =
        data?.deleteTransaction?.date || data?.updateTransaction?.date || data?.createTransaction?.date
            ? format(new Date(data.deleteTransaction?.date || data.updateTransaction?.date || data.createTransaction?.date), "MMM", {
                  locale: enUS,
              }).toUpperCase()
            : null;
    const year = 2024;
    const startDate = `${year}-${updatedMonth}-01`;
    const endDate = `${year}-${updatedMonth}-${lastDayOfMonth(new Date(`${year}-${updatedMonth}-01`)).getDate()}`;
    return [{ query: transactionsQuery }, { query: getCategoriesQuery }, { query: getCategoriesQuery, variables: { range: { startDate, endDate } } }];
};
