import getCategoriesQuery from "@/app/graphql/getCategories.graphql";
import getLastDate from "@/app/graphql/getLastDate.graphql";
import transactionsQuery from "@/app/graphql/getTransactions.graphql";
import getYears from "@/app/graphql/getYears.graphql";
import { getMonthAndYear } from "@/app/utils/getMonthAndYear";
import { getRange } from "@/app/utils/getRange";

export const createRefetchQueries = (data: any, previousDate?: string) => {
    const { month: updatedMonth, year: updatedYear } = getMonthAndYear(
        data?.deleteTransaction?.date || data?.updateTransaction?.date || data?.createTransaction?.date
    );
    const rangeMonth = updatedMonth && updatedYear ? getRange(updatedMonth, updatedYear) : {};
    const rangeYear = updatedYear ? getRange(null, updatedYear) : {};

    let refetchQueries = [
        { query: transactionsQuery, variables: { range: rangeMonth } },
        { query: transactionsQuery, variables: { range: rangeYear } },
        { query: getCategoriesQuery, variables: { range: rangeMonth } },
        { query: getCategoriesQuery, variables: { range: rangeYear } },
        { query: getYears },
        { query: getLastDate },
    ];

    if (previousDate) {
        const updatedDate = data?.updateTransaction?.date;
        const { month: previousMonth, year: previousYear } = getMonthAndYear(previousDate);
        if (updatedDate && previousMonth && previousYear && previousDate !== updatedDate) {
            const rangePreviousMonth = getRange(previousMonth, previousYear);
            const rangePreviousYear = getRange(null, previousYear);

            refetchQueries = [
                ...refetchQueries,
                { query: transactionsQuery, variables: { range: rangePreviousMonth } },
                { query: transactionsQuery, variables: { range: rangePreviousYear } },
                { query: getCategoriesQuery, variables: { range: rangePreviousMonth } },
                { query: getCategoriesQuery, variables: { range: rangePreviousYear } },
            ];
        }
    }

    return refetchQueries;
};
