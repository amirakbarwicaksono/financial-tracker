import React, { useState } from "react";

interface InputProps {
    placeholder?: string;
    value?: string;
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
}

const Input = ({ placeholder, value, type, onChange, required }: InputProps) => {
    const [inputType, setInputType] = useState(type)
    const handleFocus = () =>{
        if (placeholder === 'Date'){
            setInputType('date')
        }
    }
    const handleBlur = () =>{
        if (placeholder === 'Date'){
            setInputType('text')
        }
    }
    return (
        <input
            type={inputType}
            placeholder={placeholder}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onChange}
            required={required}
            className="w-full focus:border-fuchsia-600 bubble outline-none border-thin min-w-[100px]"
        />
    );
};

export default Input;
