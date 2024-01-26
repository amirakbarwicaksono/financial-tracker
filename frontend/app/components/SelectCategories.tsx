import { useSuspenseQuery } from "@apollo/client";
import categoriesQuery from "../graphql/getCategories.graphql";

interface SelectProps {
    formData: {
        item: string;
        amount: string;
        category: string;
        date: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            item: string;
            amount: string;
            category: string;
            date: string;
        }>
    >;
}

const SelectCategories = ({ formData, setFormData }: SelectProps) => {
    const {
        data: { Categories: categories },
    } = useSuspenseQuery<any>(categoriesQuery);

    return (
        <select
            defaultValue=""
            id="categories"
            className=" focus:border-fuchsia-600 hover:cursor-pointer bg-white bg-opacity-5 py-[9px] px-1 rounded-lg text-neutral-200 w-full outline-none border-thin min-w-[100px] "
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
            <option
                value=""
                disabled
                className="bg-black font-bold text-white"
            >
                Category
            </option>
            {categories.map((category: any) => (
                <option
                    key={category.id}
                    value={category.id}
                    className=" bg-black font-extralight"
                >
                    {category.name}
                </option>
            ))}
        </select>
    );
};

export default SelectCategories;
