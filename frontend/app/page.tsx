import Calendar from "./components/Calendar";
import CategoryPieChart from "./components/CategoryPieChart";
import Graph from "./components/Graph";
import Navbar from "./components/Navbar";
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
                    <Graph />
                    <CategoryPieChart />
                </div>
            </div>
        </div>
    );
}
