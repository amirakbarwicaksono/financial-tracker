"use client";

export const dynamic = "force-dynamic";

import { useMutation } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { format } from "date-fns";
import Edit from "../Icons/Edit";
import Trash from "../Icons/Trash";
import deleteTransactionMutation from "../graphql/deleteTransaction.graphql";
import categoriesQuery from "../graphql/getCategories.graphql";
import transactionsQuery from "../graphql/getTransactions.graphql";
import IconButton from "./IconButton";

// Transactions.js
import { useMemo, useState } from "react";
import EditPopup from "./EditPopup";

import updateTransactionMutation from "../graphql/updateTransaction.graphql";

interface TransactionProps {
    selectedCategory: string | null;
    selectedMonth: string | null;
}

interface Transaction {
    id: string;
    date: string;
    item: string;
    category: {
        id: string;
        name: string;
    };
    amount: number;
}

interface EditedItem {
    id: string;
    item: string;
    date: string;
    categoryID: string;
    amount: number;
}

const Transactions = ({ selectedCategory, selectedMonth }: TransactionProps) => {
    const {
        data: { Transactions: data },
    } = useSuspenseQuery<any>(transactionsQuery);

    const [deleteItem, { loading: deleteLoading, error: deleteError }] = useMutation(deleteTransactionMutation, {
        refetchQueries: [transactionsQuery, categoriesQuery],
    });

    const [updateItem, { loading: updateLoading, error: updateError }] = useMutation(updateTransactionMutation, {
        refetchQueries: [transactionsQuery, categoriesQuery],
    });

    // data.map((d: Transaction) => console.log(format(new Date(d.date), "MMM")));

    const [editedItem, setEditedItem] = useState<Transaction | null>(null);
    const transformedData = useMemo(() => {
        let filteredData = selectedCategory ? data.filter((transaction: Transaction) => transaction.category.name === selectedCategory) : data;
        filteredData = selectedMonth
            ? filteredData.filter((transaction: Transaction) => format(new Date(transaction.date), "MMM").toLowerCase() === selectedMonth.toLowerCase())
            : filteredData;
        filteredData = filteredData
            .map((d: Transaction) => ({
                ...d,
                date: format(new Date(d.date), "dd-MMMM-yyyy"),
            }))
            .sort((a: { date: string | number | Date }, b: { date: string | number | Date }) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return filteredData;
    }, [data, selectedCategory, selectedMonth]);

    if (deleteLoading || updateLoading) return "Loading...";
    if (deleteError || updateError) return `${deleteError ? deleteError.message : updateError ? updateError.message : "Error!"}`;

    // let transformedData = data
    // .map((d: Transaction) => ({
    //     ...d,
    //     date: format(new Date(d.date), "dd-MMMM-yyyy"),
    //     // category: d.category.name,
    // }))
    // .sort((a: { date: string | number | Date }, b: { date: string | number | Date }) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // transformedData = selectedCategory ? transformedData.filter((transaction: any) => transaction.category.name === selectedCategory) : transformedData;
    // transformedData = selectedMonth ? transformedData.filter((transaction:any) => transaction.date === selectedMonth) : transformedData;
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
        <div className="overflow-auto pr-2 h-full min-w-[600px]">
            <table className="w-full capitalize text-center border-separate border-spacing-0 ">
                <thead className="bg-purple-950 sticky top-0">
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
                                        className="w-4 flex items-center"
                                        onClick={() => handleEditClick(d)}
                                    >
                                        <IconButton>
                                            <Edit />
                                        </IconButton>
                                    </div>
                                    <div
                                        className="w-4 flex items-center"
                                        onClick={() => deleteItem({ variables: { id: d.id } })}
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
