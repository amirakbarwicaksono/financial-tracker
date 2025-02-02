export interface RangeInput {
	startDate: string;
	endDate: string;
}

export interface QueryVariables {
	year: number;
	range: RangeInput;
}

export interface Transaction {
	id: number;
	item: string;
	category: Category;
	isIncome: boolean;
	date: string;
	amount: number;
	userId: string;
}

export interface Category {
	id: number;
	name: string;
	transactions: Transaction[];
	total: number;
}

export interface MonthSummary {
	month: number;
	categories: Category[];
	total: number;
}

export interface QueryResponse {
	TransactionsByMonth: MonthSummary[];
	Categories: Category[];
	Years: number[];
}

export interface CreateTransactionMutation {
	createTransaction: {
		id: string;
		item: string;
		date: string;
		amount: number;
		category: {
			id: string;
			name: string;
		};
	};
}

export interface CreateTransactionVariables {
	input: {
		item: string;
		categoryID: string;
		isIncome: boolean;
		date: string;
		amount: number;
	};
}

export interface DeleteTransactionVariables {
	id: number;
}

export interface UpdateTransactionInput {
	item: string;
	categoryID: string;
	isIncome?: boolean;
	date: string;
	amount: number;
}

export interface UpdateTransactionResponse {
	id: string;
	item: string;
	category: {
		id: string;
		name: string;
	};
	amount: number;
	date: string;
}

export interface UpdateTransactionVariables {
	id: number;
	input: UpdateTransactionInput;
}

export interface CategoriesQueryResponse {
	Categories: Category[];
}

export interface UserMetadata {
	avatar_url?: string;
	email: string;
	email_verified: boolean;
	full_name: string;
	iss: string;
	name: string;
	phone_verified: boolean;
	picture: string;
	provider_id: string;
	sub: string;
}
