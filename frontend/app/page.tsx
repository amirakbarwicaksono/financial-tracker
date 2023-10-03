import BarGraph from "./components/BarGraph";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import PieGraph from "./components/PieGraph";
import Sidebar from "./components/Sidebar";
import TransactionForm from "./components/TransactionForm";
import Transactions from "./components/Transactions";

export default function Home() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full flex flex-col p-2 h-screen ">
                <Navbar />
                <div className="flex-grow grid grid-cols-12 grid-rows-6 gap-2 overflow-hidden">
                    <div className="bubble  col-span-5 row-span-3 ">
                        <PieGraph />
                    </div>
                    <div className="bubble col-span-4 row-span-3">
                        <BarGraph />
                    </div>
                    <div className="bubble col-span-3 row-span-6">
                        <Calendar />
                    </div>
                    <div className="bubble col-span-2 row-span-3 overflow-auto">
                        <TransactionForm />
                    </div>
                    <div className="bubble col-span-7 row-span-3 overflow-hidden">
                        <Transactions />
                    </div>
                </div>
            </div>
        </div>
    );
}
