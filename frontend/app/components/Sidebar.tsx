import Home from "@/app/Icons/Home";
import Logout from "@/app/Icons/Logout";
import Notification from "@/app/Icons/Notification";
import Settings from "@/app/Icons/Settings";
import Star from "@/app/Icons/Star";
import IconButton from "@/app/components/IconButton";
import { supabase } from "@/app/login/config";
import { useRouter } from "next/navigation";

const Sidebar = () => {
    const router = useRouter();
    return (
        <div className="flex h-12 w-screen md:h-screen md:w-12 text-white md:flex-col justify-around items-center gap-8  md:rounded-r-3xl bg-neutral-900 p-4 md:px-3 md:py-20">
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

            <div className="grow hidden md:block"></div>
            <IconButton
                handleClick={async () => {
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
