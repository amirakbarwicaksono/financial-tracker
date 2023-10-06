const Navbar = () => {
    return (
        <nav className="  h-12 bubble flex items-center justify-between ">
            <p className="w-1/3">LOGO</p>
            <p className="w-1/3 md:text-xl md:font-semibold  text-center">Dashboard</p>
            <div className="w-1/3 flex items-center justify-end gap-2 md:gap-4 md:text-lg ">
                <p className="hidden md:block">Aashish Agarwal</p>
                <div className=" rounded-full w-8 h-8  bg-teal-500 flex justify-center items-center">
                    <p>A</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
