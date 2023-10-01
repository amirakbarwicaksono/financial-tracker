const Button = ({ name }: { name: string }) => {
    return <button className="bubble border-thin w-full min-w-[100px] capitalize hover:bg-opacity-20 active:bg-opacity-10">{name}</button>;
};

export default Button;
