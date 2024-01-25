interface IconButtonProps {
    children: any;
    handleClick?: any;
}

const IconButton = ({ children, handleClick }: IconButtonProps) => {
    return (
        <button
            onClick={handleClick}
            className=" md:w-full  w-6  hover:scale-125 transition"
        >
            {children}
        </button>
    );
};

export default IconButton;
