import React, { ChangeEvent } from "react";

interface EditInputProps {
	label: string;
	type: string;
	value: string | number;
	required: boolean;
	onChange: (value: string | number) => void;
}

const EditInput: React.FC<EditInputProps> = ({
	label,
	type,
	value,
	required,
	onChange,
}) => {
	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-600">
				{label}:
			</label>
			<input
				type={type}
				value={value}
				required={required}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					onChange(e.target.value)
				}
				className="w-full rounded-md border px-3 py-2 capitalize text-gray-600 focus:outline-purple-700"
			/>
		</div>
	);
};

export default EditInput;
