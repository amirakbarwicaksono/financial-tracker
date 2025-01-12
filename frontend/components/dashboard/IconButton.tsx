interface IconButtonProps {
	children: any;
	handleClick?: any;
}

const IconButton = ({ children, handleClick }: IconButtonProps) => {
	return (
		<button
			onClick={handleClick}
			className="w-6 transition hover:scale-125 md:w-full"
		>
			{children}
		</button>
	);
};

export default IconButton;
