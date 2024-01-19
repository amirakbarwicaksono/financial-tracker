const Button = ({ name }: { name: string }) => {
    return (
        <button
            type="submit"
            className="bubble border-thin w-full min-w-[100px] capitalize hover:bg-opacity-20 active:bg-opacity-10"
        >
            {name}
        </button>
    );
};

export default Button;
