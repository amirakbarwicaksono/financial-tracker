import getYears from "@/app/graphql/getYears.graphql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Image from "next/image";

interface NavbarProps {
    selectedYear: number;
    setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar = ({ selectedYear, setSelectedYear }: NavbarProps) => {
    const {
        data: { Years },
    } = useSuspenseQuery<any>(getYears);

    const userstring = JSON.parse(localStorage.getItem("user") ?? "{}");
    const user = Object.keys(userstring).length && userstring.user_metadata;

    return (
        <nav className="  h-12 bubble flex items-center justify-between ">
            {/* <p className="w-1/3">LOGO</p> */}
            <select
                className="focus:border-fuchsia-600 hover:cursor-pointer bg-white bg-opacity-5 py-[9px] px-1 rounded-lg text-neutral-200 outline-none border-thin min-w-[100px] "
                onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
                {Years &&
                    Years.map((year: number) => (
                        <option
                            key={year}
                            value={year}
                            className=" bg-black font-extralight text-neutral-200"
                        >
                            {year}
                        </option>
                    ))}
            </select>
            <p className=" md:text-xl md:font-semibold  text-center">Dashboard</p>
            <div className="flex items-center justify-end gap-2 md:gap-4 md:text-lg ">
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
