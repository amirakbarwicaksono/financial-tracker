import Button from "./Button";
import Input from "./Input";

const TransactionForm = () => {
    return (
        <div className="overflow-auto pr-2 h-full ">
            <form
                action=""
                className="flex flex-col h-full gap-2"
            >
                <Input placeholder="item"></Input>
                <Input placeholder="amount"></Input>
                <Input placeholder="category"></Input>
                <Input placeholder="date"></Input>
                <div className="flex-grow" />
                <Button name="add" />
            </form>
        </div>
    );
};

export default TransactionForm;
