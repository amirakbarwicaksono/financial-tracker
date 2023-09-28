import Button from "./Button";
import Input from "./Input";

const TransactionForm = () => {
    return (
        <div className="bubble col-span-2 row-span-3">
            <form
                action=""
                className="flex flex-col h-full"
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
