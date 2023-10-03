import Home from "../Icons/Home";
import Logout from "../Icons/Logout";
import Notification from "../Icons/Noticification";
import Settings from "../Icons/Settings";
import Star from "../Icons/Star";
import IconButton from "./IconButton";

const Sidebar = () => {
    return (
        <div className="flex h-screen w-12 text-white flex-col items-center gap-8 rounded-r-3xl bg-neutral-900 px-3 py-20">
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

            <div className="grow"></div>
            <IconButton>
                <Logout />
            </IconButton>
        </div>
    );
};

export default Sidebar;
