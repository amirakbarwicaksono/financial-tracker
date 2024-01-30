import Image from "next/image";

const Navbar = () => {
    const userstring = JSON.parse(localStorage.getItem("user") ?? "{}");
    const user = Object.keys(userstring).length && userstring.user_metadata;

    return (
        <nav className="  h-12 bubble flex items-center justify-between ">
            <p className="w-1/3">LOGO</p>
            <p className="w-1/3 md:text-xl md:font-semibold  text-center">Dashboard</p>
            <div className="w-1/3 flex items-center justify-end gap-2 md:gap-4 md:text-lg ">
                <p className="hidden md:block capitalize">{user?.name}</p>

                <Image
                    className="rounded-full"
                    src={user.picture}
                    alt="profile picture"
                    width={32}
                    height={32}
                />
            </div>
        </nav>
    );
};

export default Navbar;
