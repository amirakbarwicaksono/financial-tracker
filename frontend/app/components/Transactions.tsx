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
                                    <button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                            />
                                        </svg>
                                    </button>

                                    <button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
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
