import Edit from "../Icons/Edit";
import Trash from "../Icons/Trash";
import IconButton from "./IconButton";

const Transactions = () => {
    const data = [
        { id: 0, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
        { id: 1, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
        { id: 2, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
        { id: 3, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
        { id: 4, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
        { id: 5, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
        { id: 6, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
        { id: 7, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
        { id: 8, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
        { id: 9, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
        { id: 10, date: "22-09-2023", item: "milk", category: "grocery", amount: 50 },
    ];
    return (
        <div className="overflow-auto pr-2 max-h-full">
            <table className="w-full capitalize text-center border-separate border-spacing-0 ">
                <thead className="bg-purple-950 sticky top-0">
                    <tr>
                        <th>date</th>
                        <th>item</th>
                        <th>category</th>
                        <th>amount</th>
                        <th>actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((d) => (
                        <tr key={d.id}>
                            <td>{d.date}</td>
                            <td>{d.item}</td>
                            <td>{d.category}</td>
                            <td>{d.amount}</td>
                            <td>
                                <div className="flex justify-center gap-8">
                                    <div className="w-4 flex items-center">
                                        <IconButton>
                                            <Edit />
                                        </IconButton>
                                    </div>
                                    <div className="w-4 flex items-center">
                                        <IconButton>
                                            <Trash />
                                        </IconButton>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
