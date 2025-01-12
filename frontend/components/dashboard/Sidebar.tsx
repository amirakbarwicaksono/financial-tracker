import Home from "@/app/Icons/Home";
import Logout from "@/app/Icons/Logout";
import Notification from "@/app/Icons/Notification";
import Settings from "@/app/Icons/Settings";
import Star from "@/app/Icons/Star";
import IconButton from "@/components/dashboard/IconButton";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Sidebar = () => {
	const router = useRouter();
	return (
		<div className="flex h-12 w-screen items-center justify-around gap-8 border p-4 md:h-full md:w-12 md:flex-col md:rounded-r-3xl md:px-3 md:py-20">
			<IconButton>
				<Home />
			</IconButton>
			<IconButton>
				<Star />
			</IconButton>
			<IconButton>
				<Notification />
			</IconButton>
			<IconButton>
				<Settings />
			</IconButton>

			<div className="hidden grow md:block"></div>
			<IconButton
				handleClick={async () => {
					const supabase = createClient();
					await supabase.auth.signOut();
					router.push("/");
				}}
			>
				<Logout />
			</IconButton>
		</div>
	);
};

export default Sidebar;
