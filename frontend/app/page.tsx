import Calendar from "./components/Calendar";
import CategoryPieChart from "./components/CategoryPieChart";
import Graph from "./components/Graph";
import InputTransaction from "./components/InputTransaction";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Transactions from "./components/Transactions";

export default function Home() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full flex flex-col p-8">
                <Navbar />

                <div className="flex-grow grid grid-cols-5 grid-rows-6 gap-4">
                    <InputTransaction />
                    <Graph />
                    <Calendar />
                    <Transactions />
                    <CategoryPieChart />
                </div>
            </div>
        </div>
    );
}
