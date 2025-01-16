"use client";

import { DataTableColumnHeader } from "@/components/dashboard/transactions/DataTableColumnHeader";
import EditForm from "@/components/dashboard/transactions/EditForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import updateTransactionMutation from "@/graphql/updateTransaction.graphql";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import deleteTransactionMutation from "@/graphql/deleteTransaction.graphql";
import { createRefetchQueries } from "@/utils/createRefetchQueries";
import { useMutation } from "@apollo/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
	id: number;
	date: string;
	item: string;
	category: {
		id: number;
		name: string;
	};
	amount: number;
};

export const columns: ColumnDef<Transaction>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => {
			const date: string = row.getValue("date");
			const formatted = format(new Date(date), "dd-MMM-yy");

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: "item",
		header: "Item",
	},
	{
		accessorKey: "category",
		header: "Category",
		cell: ({ row }) => {
			const { name }: Transaction["category"] = row.getValue("category");
			return <div>{name}</div>;
		},
	},
	{
		accessorKey: "amount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Amount" />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-IN", {
				style: "currency",
				currency: "INR",
			}).format(amount);

			return <div>{formatted}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <Cell row={row} />,
	},
];

const Cell = ({ row }: { row: Row<Transaction> }) => {
	const transaction = row.original;
	const [deleteItem, { loading: deleteLoading, error: deleteError }] =
		useMutation(deleteTransactionMutation, {
			refetchQueries: ({ data }) => createRefetchQueries(data),
		});

	const [updateItem, { loading: updateLoading, error: updateError }] =
		useMutation(updateTransactionMutation, {
			refetchQueries: ({ data }) =>
				createRefetchQueries(data, transaction.date),
		});

	const handleSubmit = (data: any) => {
		updateItem({
			variables: {
				id: transaction.id,
				input: {
					item: data.item,
					categoryID: data.category,

					amount: data.amount,
					date: data.date,
				},
			},
		});
	};

	enum Dialogs {
		edit = "edit",
		delete = "delete",
	}

	const [dialog, setDialog] = useState<Dialogs>();

	if (deleteLoading) return "Deleting...";
	if (deleteError) return deleteError.message;
	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-6 w-6 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-3 w-3" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() =>
							navigator.clipboard.writeText(transaction.id.toString())
						}
					>
						Copy transaction ID
					</DropdownMenuItem>
					<DropdownMenuSeparator />

					<DialogTrigger asChild onClick={() => setDialog(Dialogs.edit)}>
						<DropdownMenuItem>Edit</DropdownMenuItem>
					</DialogTrigger>

					<DialogTrigger asChild onClick={() => setDialog(Dialogs.delete)}>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			{dialog === Dialogs.edit ? (
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit transaction</DialogTitle>
						<DialogDescription>
							Make changes to your transaction here. Click update when
							you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<EditForm {...transaction} handleSubmit={handleSubmit}>
						<DialogFooter>
							<Button type="submit" disabled={updateLoading}>
								{updateError ? "Updating..." : "Update"}
							</Button>
							{updateError && (
								<p className="text-red-500">{`Updation error: ${updateError.message}`}</p>
							)}
						</DialogFooter>
					</EditForm>
				</DialogContent>
			) : (
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. Are you sure you want to permanently
							delete this file from our servers?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							onClick={() => {
								deleteItem({ variables: { id: transaction.id } });
							}}
							type="submit"
						>
							Confirm
						</Button>
					</DialogFooter>
				</DialogContent>
			)}
		</Dialog>
	);
};
