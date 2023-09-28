const Input = ({ placeholder }: { placeholder?: string }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="w-full mb-2 bubble outline-none border-thin"
        />
    );
};

export default Input;
