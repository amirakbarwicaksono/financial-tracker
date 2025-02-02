"use server";

import {
	CreateTransactionVariables,
	DeleteTransactionVariables,
	QueryResponse,
	RangeInput,
	UpdateTransactionVariables,
} from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { revalidateTag } from "next/cache";

export const getLastDate = async () => {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const query = `
		query {
			LastDate
		}	
	`;
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.access_token}`,
		},
		body: JSON.stringify({ query }),
	});

	const responseData = await response.json();
	if (response.ok) {
		return responseData.data.LastDate;
	} else {
		throw new Error(
			`GraphQL query failed: ${responseData.errors?.[0]?.message}`,
		);
	}
};

export const getYearlyData = async (
	selectedYear: number,
	range: RangeInput,
) => {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	const query = `
		  query ($year: Int!, $range: RangeInput) {
			TransactionsByMonth(year: $year) {
			  total
			  categories {
				total
				name
				transactions {
				  id
				  item
				  amount
				  date
				  category {
					id
					name
				  }
				}
			  }
			}
			Categories(range: $range) {
			  id
			  name
			  total(range: $range)
			}
			Years
		  }
		`;

	const variables = {
		year: selectedYear,
		range: range,
	};

	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.access_token}`,
		},
		body: JSON.stringify({ query, variables }),
		cache: "force-cache",
		next: {
			tags: [`data-${selectedYear}`],
		},
	});

	const responseData = await response.json();
	if (response.ok) {
		const {
			TransactionsByMonth: d,
			Categories,
			Years,
		}: QueryResponse = responseData.data;
		return { d, Categories, Years };
	} else {
		throw new Error(
			`GraphQL query failed: ${responseData.errors?.[0]?.message}`,
		);
	}
};

export const createTransaction = async (
	variables: CreateTransactionVariables,
) => {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const query = `
		mutation ($input: TransactionInput!) {
			createTransaction(input: $input) {
				id
				item
				date
				amount
				category {
					id
					name
				}
			}
		}
	`;

	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.access_token}`,
		},
		body: JSON.stringify({ query, variables }),
	});

	const responseData = await response.json();

	if (response.ok) {
		revalidateTag(`data-${format(variables.input.date, "yyyy")}`);
		return { error: null };
	} else {
		return {
			error: `GraphQL query failed: ${responseData.errors?.[0]?.message}`,
		};
	}
};

export const updateTransactions = async (
	variables: UpdateTransactionVariables,
	oldYear: string,
) => {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const query = `
		mutation ($id: ID!, $input: UpdateTransactionInput!) {
			updateTransaction(id: $id, input: $input) {
				id
				item
				category {
					id
					name
				}
				amount
				date
			}
		}

	`;

	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.access_token}`,
		},
		body: JSON.stringify({ query, variables }),
	});

	const responseData = await response.json();

	if (response.ok) {
		const newYear = format(responseData.data.updateTransaction.date, "yyyy");
		revalidateTag(`data-${newYear}`);
		if (oldYear !== newYear) {
			revalidateTag(`data-${oldYear}`);
		}
		return { error: null };
	} else {
		return {
			error: `GraphQL query failed: ${responseData.errors?.[0]?.message}`,
		};
	}
};

export const deleteTransaction = async (
	variables: DeleteTransactionVariables,
) => {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const query = `
		mutation ($id: ID!) {
			deleteTransaction(id: $id) {
				id
				item
				date
				amount
				category {
					id
					name
				}
			}
		}
	`;

	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.access_token}`,
		},
		body: JSON.stringify({ query, variables }),
	});

	const responseData = await response.json();

	if (response.ok) {
		revalidateTag(
			`data-${format(responseData.data.deleteTransaction.date, "yyyy")}`,
		);
		return { error: null };
	} else {
		return {
			error: `GraphQL query failed: ${responseData.errors?.[0]?.message}`,
		};
	}
};
