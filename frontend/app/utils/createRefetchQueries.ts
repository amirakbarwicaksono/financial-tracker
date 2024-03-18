import getCategoriesQuery from "@/app/graphql/getCategories.graphql";
import transactionsQuery from "@/app/graphql/getTransactions.graphql";
import getYears from "@/app/graphql/getYears.graphql";
import { getRange } from "@/app/utils/getRange";
import { format } from "date-fns";
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

    const rangeMonth = updatedMonth && updatedYear ? getRange(updatedMonth, updatedYear) : {};
    const rangeYear = updatedYear ? getRange(null, updatedYear) : {};

    return [
        { query: transactionsQuery, variables: { range: rangeMonth } },
        { query: transactionsQuery, variables: { range: rangeYear } },
        { query: getCategoriesQuery, variables: { range: rangeMonth } },
        { query: getCategoriesQuery, variables: { range: rangeYear } },
        { query: getYears },
    ];
};
