const Navbar = () => {
    return (
        <nav className=" mb-2 h-12 bubble flex items-center justify-between ">
            <p>LOGO</p>
            <p className="text-xl font-semibold ">Dashboard</p>
            <div className="flex gap-4 text-lg">
                <p>Aashish Agarwal</p>
                <div className=" rounded-full w-8 h-8  bg-teal-500 flex justify-center items-center">
                    <p>A</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
