import React from "react";

interface InputProps {
    placeholder?: string;
    value?: string;
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
}

const Input = ({ placeholder, value, type, onChange, required }: InputProps) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full focus:border-fuchsia-600 bubble outline-none border-thin min-w-[100px]"
        />
    );
};

export default Input;
