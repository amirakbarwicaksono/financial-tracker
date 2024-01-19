import { useMutation } from "@apollo/client";
import { useState } from "react";
import createTransactionMutation from "../graphql/createTransaction.graphql";
import categoriesQuery from "../graphql/getCategories.graphql";
import transactionsQuery from "../graphql/getTransactions.graphql";
import Button from "./Button";
import Input from "./Input";

const TransactionForm = () => {
    const [formData, setFormData] = useState({
        item: "",
        amount: "",
        category: "",
        date: "",
    });

    const [createTransaction, { loading, error }] = useMutation(createTransactionMutation, { refetchQueries: [transactionsQuery, categoriesQuery] });

    if (loading) return "Submitting...";
    if (error) return `Submission error! ${error.message}`;

    const handleSubmit = (e: any) => {
        e.preventDefault();

        createTransaction({
            variables: {
                input: {
                    item: formData.item,
                    categoryID: formData.category,
                    isIncome: false,
                    date: formData.date,
                    amount: parseFloat(formData.amount),
                },
            },
        });

        setFormData({
            item: "",
            amount: "",
            category: "",
            date: "",
        });
    };

    return (
        <div className="overflow-auto pr-2 h-full">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col h-full gap-2"
            >
                <Input
                    placeholder="Item"
                    value={formData.item}
                    onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                />
                <Input
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
                <Input
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <Input
                    placeholder="Date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <div className="flex-grow" />
                <Button name="add" />
            </form>
        </div>
    );
};

export default TransactionForm;
