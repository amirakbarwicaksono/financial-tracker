import { Dispatch, SetStateAction } from "react";

type TabsProps = {
    tab: number;
    setTab: Dispatch<SetStateAction<number>>;
};

const Tabs: React.FC<TabsProps> = ({ tab, setTab }) => {
    return (
        <div className="h-6 lg:hidden bubble !p-0  flex justify-around items-center">
            <div
                onClick={() => setTab(1)}
                className={`lg:hidden tabs rounded-l-lg ${tab === 1 ? "tab-active  " : "tab-unactive"}`}
            >
                Home
            </div>
            <div
                onClick={() => setTab(2)}
                className={`md:hidden tabs ${tab === 2 ? "tab-active" : "tab-unactive"}`}
            >
                Transactions
            </div>
            <div
                onClick={() => setTab(3)}
                className={`lg:hidden tabs rounded-r-lg ${tab === 3 ? "tab-active" : "tab-unactive"}`}
            >
                Accounts
            </div>
        </div>
    );
};

export default Tabs;
