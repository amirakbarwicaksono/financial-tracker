import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import getYears from "@/graphql/getYears.graphql";
import { createClient } from "@/utils/supabase/client";
import { useSuspenseQuery } from "@apollo/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NavbarProps {
	selectedYear: number;
	setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar = ({ selectedYear, setSelectedYear }: NavbarProps) => {
	const {
		data: { Years },
	} = useSuspenseQuery<any>(getYears);

	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const supabase = createClient();
		supabase.auth
			.getUser()
			.then((resolve) => setUser(resolve.data.user?.user_metadata));
	}, []);

	return (
		user && (
			<nav className="bubble flex h-12 items-center justify-between">
				{/* <p className="w-1/3">LOGO</p> */}

				<Select
					onValueChange={(value) => setSelectedYear(Number(value))}
					value={selectedYear.toString()}
				>
					<SelectTrigger className="w-24">
						<SelectValue placeholder="Select Year" />
					</SelectTrigger>
					<SelectContent>
						{Years &&
							Years.map((year: number) => (
								<SelectItem key={year} value={year.toString()}>
									{year}
								</SelectItem>
							))}
					</SelectContent>
				</Select>
				<p className="text-center md:text-xl md:font-semibold">Dashboard</p>
				<div className="flex items-center justify-end gap-2 md:gap-4 md:text-lg">
					<p className="hidden capitalize md:block">{user?.name}</p>

					<Image
						className="rounded-full"
						src={user.picture}
						alt="profile picture"
						width={32}
						height={32}
					/>
				</div>
			</nav>
		)
	);
};

export default Navbar;
