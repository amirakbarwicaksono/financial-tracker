"use client";

import Edit from "@/app/Icons/Edit";
import Trash from "@/app/Icons/Trash";
import EditPopup from "@/components/dashboard/EditPopup";
import IconButton from "@/components/dashboard/IconButton";
import deleteTransactionMutation from "@/graphql/deleteTransaction.graphql";
import transactionsQuery from "@/graphql/getTransactions.graphql";
import updateTransactionMutation from "@/graphql/updateTransaction.graphql";
import { createRefetchQueries } from "@/utils/createRefetchQueries";
import { getRange } from "@/utils/getRange";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { format } from "date-fns";
import { useState } from "react";

interface TransactionProps {
	selectedCategory: string | null;
	selectedMonth: number | undefined;
	selectedYear: number;
}

export interface Transaction {
	id: string;
	date: string;
	item: string;
	category: {
		id: string;
		name: string;
	};
	amount: number;
}

export interface EditedItem {
	id: string;
	item: string;
	date: string;
	categoryID: string;
	amount: number;
}

const Transactions = ({
	selectedCategory,
	selectedMonth,
	selectedYear,
}: TransactionProps) => {
	const [editedItem, setEditedItem] = useState<Transaction | null>(null);

	const {
		data: { Transactions: data },
	} = useSuspenseQuery<any>(transactionsQuery, {
		variables: { range: getRange(selectedMonth, selectedYear) },
	});

	const [deleteItem, { loading: deleteLoading, error: deleteError }] =
		useMutation(deleteTransactionMutation, {
			refetchQueries: ({ data }) => createRefetchQueries(data),
		});

	const [updateItem, { loading: updateLoading, error: updateError }] =
		useMutation(updateTransactionMutation, {
			refetchQueries: ({ data }) =>
				createRefetchQueries(data, editedItem?.date),
		});

	// const transformedData = useMemo(() => {
	let transformedData = selectedCategory
		? data.filter(
				(transaction: Transaction) =>
					transaction.category.name === selectedCategory,
			)
		: data;
	transformedData = transformedData.map((d: Transaction) => ({
		...d,
		date: format(new Date(d.date), "dd-MMMM-yyyy"),
	}));

	//     return filteredData;
	// }, [data, selectedCategory, selectedMonth]);

	if (deleteLoading || updateLoading) return "Loading...";
	if (deleteError || updateError)
		return `${deleteError ? deleteError.message : updateError ? updateError.message : "Error!"}`;

	const handleEditClick = (item: Transaction) => {
		setEditedItem(item);
	};

	const handleUpdate = (updatedItem: EditedItem) => {
		updateItem({
			variables: {
				id: updatedItem.id,
				input: {
					item: updatedItem.item,
					categoryID: updatedItem.categoryID,
					amount: updatedItem.amount,
					date: updatedItem.date,
				},
			},
		});
		setEditedItem(null);
	};

	const handleClosePopup = () => {
		setEditedItem(null);
	};

	return (
		<div className="h-full min-w-[600px] overflow-auto pr-2">
			<table className="w-full border-separate border-spacing-0 text-center capitalize">
				<thead className="sticky top-0 bg-purple-950">
					<tr>
						<th>date</th>
						<th>item</th>
						<th>category</th>
						<th>amount</th>
						<th>actions</th>
					</tr>
				</thead>

				<tbody>
					{transformedData.map((d: Transaction) => (
						<tr key={d.id}>
							<td>{d.date}</td>
							<td>{d.item}</td>
							<td>{d.category.name}</td>
							<td>{d.amount}</td>
							<td>
								<div className="flex justify-center gap-8">
									<div
										className="flex w-4 items-center"
										onClick={() => handleEditClick(d)}
									>
										<IconButton>
											<Edit />
										</IconButton>
									</div>
									<div
										className="flex w-4 items-center"
										onClick={() => {
											deleteItem({ variables: { id: d.id } });
										}}
									>
										<IconButton>
											<Trash />
										</IconButton>
									</div>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{editedItem && (
				<EditPopup
					transaction={editedItem}
					onUpdate={handleUpdate}
					onClose={handleClosePopup}
				/>
			)}
		</div>
	);
};

export default Transactions;
