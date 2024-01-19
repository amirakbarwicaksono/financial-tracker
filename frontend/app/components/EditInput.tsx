// EditInput.tsx
import React, { ChangeEvent } from "react";

interface EditInputProps {
    label: string;
    type: string;
    value: string | number;
    onChange: (value: string | number) => void;
}

const EditInput: React.FC<EditInputProps> = ({ label, type, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">{label}:</label>
            <input
                type={type}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                className="border rounded-md px-3 py-2 w-full text-gray-600 focus:outline-purple-700"
            />
        </div>
    );
};

export default EditInput;
