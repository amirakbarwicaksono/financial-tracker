import Home from "@/app/Icons/Home";
import Logout from "@/app/Icons/Logout";
import Notification from "@/app/Icons/Notification";
import Settings from "@/app/Icons/Settings";
import Star from "@/app/Icons/Star";
import IconButton from "@/app/components/IconButton";
import { supabase } from "@/app/utils/supabase/config";
import { useRouter } from "next/navigation";

const Sidebar = () => {
    const router = useRouter();
    return (
        <div className="flex border h-12 w-screen md:h-full md:w-12  md:flex-col justify-around items-center gap-8  md:rounded-r-3xl p-4 md:px-3 md:py-20">
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
