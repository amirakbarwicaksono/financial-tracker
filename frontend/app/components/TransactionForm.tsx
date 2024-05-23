import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import createTransactionMutation from "@/app/graphql/createTransaction.graphql";
import categoriesQuery from "@/app/graphql/getCategories.graphql";
import { createRefetchQueries } from "@/app/utils/createRefetchQueries";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { useState } from "react";

const TransactionForm = () => {
    const [formData, setFormData] = useState({
        item: "",
        amount: "",
        category: "",
        date: "",
    });

    const {
        data: { Categories: categories },
    } = useSuspenseQuery<any>(categoriesQuery);

    const [createTransaction, { loading, error }] = useMutation(createTransactionMutation, {
        refetchQueries: ({ data }) => createRefetchQueries(data),
    });

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
                    type="text"
                    placeholder="Item"
                    value={formData.item}
                    onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                    required
                />

                <Input
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                />
                <select
                    defaultValue=""
                    id="categories"
                    className=" focus:border-fuchsia-600 hover:cursor-pointer bg-white bg-opacity-5 py-[9px] px-1 rounded-lg text-neutral-200 w-full outline-none border-thin min-w-[100px] "
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                >
                    <option
                        value=""
                        disabled
                        className="bg-black font-bold text-white"
                    >
                        Category
                    </option>
                    {categories.map((category: any) => (
                        <option
                            key={category.id}
                            value={category.id}
                            className=" bg-black font-extralight"
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
                <Input
                    type="text"
                    placeholder="Date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                />
                <div className="flex-grow" />
                <Button name="add" />
            </form>
        </div>
    );
};

export default TransactionForm;
