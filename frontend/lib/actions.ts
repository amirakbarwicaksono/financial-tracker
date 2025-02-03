"use server";

import createTransactionMutation from "@/graphql/createTransaction.graphql";
import deleteTransactionMutation from "@/graphql/deleteTransaction.graphql";
import getLastDateQuery from "@/graphql/getLastDate.graphql";
import getYearlyDataQuery from "@/graphql/getYearlyData.graphql";
import updateTransactionMutation from "@/graphql/updateTransaction.graphql";
import { request } from "@/lib/request";
import {
	CreateTransactionVariables,
	DeleteTransactionVariables,
	QueryResponse,
	UpdateTransactionVariables,
} from "@/types/types";
import { getRange } from "@/utils/getRange";
import { getUser } from "@/utils/getUser";
import { format } from "date-fns";
import { revalidateTag } from "next/cache";

export const getLastDate = async () => {
	const { data, errors } = await request(getLastDateQuery);
	if (!errors) {
		return data.LastDate;
	} else {
		throw new Error(`GraphQL query failed: ${errors?.[0]?.message}`);
	}
};

export const getYearlyData = async (selectedYear: number) => {
	const variables = {
		year: selectedYear,
		range: getRange(undefined, selectedYear),
	};

	const { id } = await getUser();

	const { data, errors } = await request(
		getYearlyDataQuery,
		variables,
		"force-cache",
		[`${id}-${selectedYear}`],
	);

	if (!errors) {
		const { TransactionsByMonth: d, Categories, Years }: QueryResponse = data;
		return { d, Categories, Years };
	} else {
		throw new Error(`GraphQL query failed: ${errors?.[0]?.message}`);
	}
};

export const createTransaction = async (
	variables: CreateTransactionVariables,
) => {
	const { errors } = await request(createTransactionMutation, variables);

	if (!errors) {
		const { id } = await getUser();
		revalidateTag(`${id}-${format(variables.input.date, "yyyy")}`);
		return { error: null };
	} else {
		return {
			error: `GraphQL query failed: ${errors?.[0]?.message}`,
		};
	}
};

export const updateTransactions = async (
	variables: UpdateTransactionVariables,
	oldDate: string,
) => {
	const { data, errors } = await request(updateTransactionMutation, variables);

	if (!errors) {
		const newYear = format(data.updateTransaction.date, "yyyy");
		const oldYear = format(oldDate, "yyyy");
		const { id } = await getUser();

		revalidateTag(`${id}-${newYear}`);
		if (oldYear !== newYear) {
			revalidateTag(`${id}-${oldYear}`);
		}
		return { error: null };
	} else {
		return {
			error: `GraphQL query failed: ${errors?.[0]?.message}`,
		};
	}
};

export const deleteTransaction = async (
	variables: DeleteTransactionVariables,
) => {
	const { data, errors } = await request(deleteTransactionMutation, variables);

	if (!errors) {
		const { id } = await getUser();
		revalidateTag(`${id}-${format(data.deleteTransaction.date, "yyyy")}`);
		return { error: null };
	} else {
		return {
			error: `GraphQL query failed: ${errors?.[0]?.message}`,
		};
	}
};
