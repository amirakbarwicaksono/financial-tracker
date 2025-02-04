"use server";

import createTransactionMutation from "@/graphql/createTransaction.graphql";
import deleteTransactionMutation from "@/graphql/deleteTransaction.graphql";
import getDaysDataQuery from "@/graphql/getDaysData.graphql";
import getLastDateQuery from "@/graphql/getLastDate.graphql";
import getYearlyDataQuery from "@/graphql/getYearlyData.graphql";
import updateTransactionMutation from "@/graphql/updateTransaction.graphql";
import { request } from "@/lib/request";
import {
	CreateTransactionVariables,
	DaysDataQueryResponse,
	DeleteTransactionVariables,
	LastDateQueryResponse,
	QueryResponse,
	UpdateTransactionVariables,
} from "@/types/types";
import { getRange } from "@/utils/getRange";
import { getUser } from "@/utils/getUser";
import { format } from "date-fns";
import { revalidateTag } from "next/cache";

export const getDaysData = async (date: string) => {
	const variables = {
		range: { startDate: date, endDate: date },
	};
	const { id } = await getUser();
	const { Transactions, Total }: DaysDataQueryResponse = await request(
		getDaysDataQuery,
		variables,
		"force-cache",
		[`${id}-${date}`],
	);
	return { Transactions, Total };
};

export const getLastDate = async () => {
	const { LastDate }: LastDateQueryResponse = await request(getLastDateQuery);

	return LastDate;
};

export const getYearlyData = async (selectedYear: number) => {
	const variables = {
		year: selectedYear,
		range: getRange(undefined, selectedYear),
	};

	const { id } = await getUser();

	const {
		TransactionsByMonth: d,
		Categories,
		Years,
	}: QueryResponse = await request(
		getYearlyDataQuery,
		variables,
		"force-cache",
		[`${id}-${selectedYear}`],
	);

	return { d, Categories, Years };
};

export const createTransaction = async (
	variables: CreateTransactionVariables,
) => {
	await request(createTransactionMutation, variables);

	const { id } = await getUser();
	revalidateTag(`${id}-${format(variables.input.date, "yyyy")}`);
	revalidateTag(`${id}-${format(variables.input.date, "yyyy-MM-dd")}`);
	return { error: null };
};

export const updateTransactions = async (
	variables: UpdateTransactionVariables,
	oldDate: string,
) => {
	const data = await request(updateTransactionMutation, variables);
	console.log(oldDate);
	const newYear = format(data.updateTransaction.date, "yyyy");
	const oldYear = format(oldDate, "yyyy");
	const { id } = await getUser();

	revalidateTag(`${id}-${newYear}`);
	revalidateTag(`${id}-${format(data.updateTransaction.date, "yyyy-MM-dd")}`);
	if (oldYear !== newYear) {
		revalidateTag(`${id}-${oldYear}`);
		revalidateTag(`${id}-${format(oldDate, "yyyy-MM-dd")}`);
	}
	return { error: null };
};

export const deleteTransaction = async (
	variables: DeleteTransactionVariables,
) => {
	const data = await request(deleteTransactionMutation, variables);

	const { id } = await getUser();
	revalidateTag(`${id}-${format(data.deleteTransaction.date, "yyyy")}`);
	revalidateTag(`${id}-${format(data.deleteTransaction.date, "yyyy-MM-dd")}`);

	return { error: null };
};
