import { Dispatch, SetStateAction } from "react";

type TabsProps = {
	tab: number;
	setTab: Dispatch<SetStateAction<number>>;
};

const Tabs: React.FC<TabsProps> = ({ tab, setTab }) => {
	return (
		<div className="bubble flex h-6 items-center justify-around !p-0 lg:hidden">
			<div
				onClick={() => setTab(1)}
				className={`tabs rounded-l-lg lg:hidden ${tab === 1 ? "tab-active" : "tab-unactive"}`}
			>
				Home
			</div>
			<div
				onClick={() => setTab(2)}
				className={`tabs md:hidden ${tab === 2 ? "tab-active" : "tab-unactive"}`}
			>
				Transactions
			</div>
			<div
				onClick={() => setTab(3)}
				className={`tabs rounded-r-lg lg:hidden ${tab === 3 ? "tab-active" : "tab-unactive"}`}
			>
				Accounts
			</div>
		</div>
	);
};

export default Tabs;
