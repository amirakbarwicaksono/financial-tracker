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
            <div className="w-full flex flex-col p-4 h-screen ">
                <Navbar />
                <div className="flex-grow grid grid-cols-12 grid-rows-6 gap-2 overflow-hidden">
                    <TransactionForm />
                    <Transactions />
                    <Calendar />
                    <BarGraph />
                    <PieGraph />
                </div>
            </div>
        </div>
    );
}
