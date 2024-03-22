import EditInput from "@/app/components/EditInput";
import { EditedItem, Transaction } from "@/app/components/Transactions";
import categoriesQuery from "@/app/graphql/getCategories.graphql";
import { useSuspenseQuery } from "@apollo/client";
import { format } from "date-fns";
import React, { useState } from "react";

interface EditPopupProps {
    transaction: Transaction;
    onUpdate: (updatedItem: EditedItem) => void;
    onClose: () => void;
}

const EditPopup: React.FC<EditPopupProps> = ({ transaction, onUpdate, onClose }) => {
    const [editedItem, setEditedItem] = useState<EditedItem>({
        id: transaction.id,
        item: transaction.item,
        amount: transaction.amount,
        categoryID: transaction.category.id,
        date: format(new Date(transaction.date), "yyyy-MM-dd"),
    });
    const {
        data: { Categories: categories },
    } = useSuspenseQuery<any>(categoriesQuery);

    const handleInputChange = (field: keyof EditedItem, value: string | number) => {
        setEditedItem((prevItem) => ({ ...prevItem, [field]: value }));
    };

    const handleUpdate = () => {
        onUpdate(editedItem);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-4 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Edit Transaction</h2>

                <EditInput
                    label="Date"
                    type="date"
                    required
                    value={editedItem.date}
                    onChange={(value) => handleInputChange("date", value)}
                />

                <EditInput
                    label="Item"
                    type="text"
                    required
                    value={editedItem.item}
                    onChange={(value) => handleInputChange("item", value)}
                />

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Category:</label>

                    <select
                        id="categories"
                        className="hover:cursor-pointer border   rounded-md p-2  w-full text-gray-600 focus:outline-purple-700"
                        onChange={(e) => handleInputChange("categoryID", e.target.value)}
                        defaultValue={editedItem?.categoryID || ""}
                    >
                        {categories.map((category: any) => (
                            <option
                                key={category.id}
                                value={category.id}
                                className=" bg-black font-extralight text-neutral-200"
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <EditInput
                    label="Amount"
                    type="number"
                    required
                    value={editedItem.amount}
                    onChange={(value) => handleInputChange("amount", Number(value))}
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleUpdate}
                        className="bg-purple-700  text-white px-4 py-2 rounded-md hover:bg-purple-800"
                    >
                        Update
                    </button>
                    <button
                        onClick={onClose}
                        className="ml-2 border px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPopup;
