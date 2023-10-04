import Home from "../Icons/Home";
import Logout from "../Icons/Logout";
import Notification from "../Icons/Noticification";
import Settings from "../Icons/Settings";
import Star from "../Icons/Star";
import IconButton from "./IconButton";

const Sidebar = () => {
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
            <IconButton>
                <Logout />
            </IconButton>
        </div>
    );
};

export default Sidebar;
