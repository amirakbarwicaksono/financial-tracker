import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import createTransactionMutation from "@/graphql/createTransaction.graphql";
import categoriesQuery from "@/graphql/getCategories.graphql";
import { cn } from "@/utils/conditional";
import { createRefetchQueries } from "@/utils/createRefetchQueries";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
	item: z.string().min(1, "Item is required"),
	amount: z.number().positive("Amount must be positive"),
	category: z.string().nonempty("Category is required"),
	date: z.date({
		required_error: "Date is required.",
	}),
});

const TransactionForm = () => {
	const {
		data: { Categories: categories },
	} = useSuspenseQuery<any>(categoriesQuery);

	const [createTransaction, { loading, error }] = useMutation(
		createTransactionMutation,
		{
			refetchQueries: ({ data }) => createRefetchQueries(data),
		},
	);

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			item: "",
			amount: "",
			category: "",
			date: undefined,
		},
	});

	const handleSubmit = (data: any) => {
		createTransaction({
			variables: {
				input: {
					item: data.item,
					categoryID: data.category,
					isIncome: false,
					date: data.date,
					amount: data.amount,
				},
			},
		});

		form.reset();
	};

	return (
		<div className="h-full overflow-auto p-0.5 pr-2">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="flex h-full flex-col gap-2"
				>
					<FormField
						name="item"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Item" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="amount"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Amount"
										type="number"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="category"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<Select value={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categories.map((category: any) => (
											<SelectItem
												key={category.id}
												value={category.id.toString()}
											>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="date"
						control={form.control}
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"bg-transparent pl-3 text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={(date) => {
												field.onChange(date);
												setIsPopoverOpen(false);
											}}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											autoFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex-grow" />
					<Button type="submit" disabled={loading}>
						{loading ? "Submitting..." : "Add Transaction"}
					</Button>
					{error && (
						<p className="text-red-500">{`Submission error: ${error.message}`}</p>
					)}
				</form>
			</Form>
		</div>
	);
};

export default TransactionForm;
