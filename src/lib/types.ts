export interface Expense {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
}

export const categories = [
    'Food',
    'Transport',
    'Entertainment',
    'Bills',
    'Shopping',
    'Health',
    'Other',
] as const;

export type Category = typeof categories[number];