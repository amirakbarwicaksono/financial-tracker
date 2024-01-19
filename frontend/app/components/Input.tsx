import React from "react";

const Input = ({ placeholder, value, onChange }: InputProps) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bubble outline-none border-thin min-w-[100px]"
        />
    );
};

interface InputProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default Input;
