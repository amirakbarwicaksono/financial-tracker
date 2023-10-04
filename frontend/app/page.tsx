import Accounts from "./components/Accounts";
import BarGraph from "./components/BarGraph";
import Navbar from "./components/Navbar";
import PieGraph from "./components/PieGraph";
import Sidebar from "./components/Sidebar";
import TransactionForm from "./components/TransactionForm";
import Transactions from "./components/Transactions";

export default function Home() {
    return (
        <div className="flex flex-col-reverse md:flex-row h-screen">
            <Sidebar />
            <div className="w-full flex flex-col p-2 flex-grow ">
                <Navbar />
                <div className="flex-grow grid grid-cols-12 grid-rows-6 gap-2 overflow-hidden">
                    <div className="bubble col-span-full md:col-span-7 lg:col-span-5 row-span-3 ">
                        <PieGraph />
                    </div>
                    <div className="bubble col-span-full md:col-span-5 lg:col-span-4 row-span-3">
                        <BarGraph />
                    </div>
                    <div className="bubble hidden lg:block lg:col-span-3 lg:row-span-6">
                        <Accounts />
                    </div>
                    <div className="bubble hidden md:block md:col-span-3 lg:col-span-2 row-span-3 overflow-auto">
                        <TransactionForm />
                    </div>
                    <div className="bubble hidden md:block md:col-span-9  lg:col-span-7 row-span-3 overflow-hidden">
                        <Transactions />
                    </div>
                </div>
            </div>
        </div>
    );
}
