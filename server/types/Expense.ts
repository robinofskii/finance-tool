export type Expense = {
  id: string; // Unique identifier
  description: string; // What the expense is for (e.g., "Groceries")
  amount: number; // The total amount of the expense
  interval: "yearly" | "monthly" | "weekly" | "custom"; // Recurrence type
  customIntervalDays?: number; // Optional: For custom intervals
  date: string; // ISO string representing the starting date of the expense
  createdAt: string; // ISO string for when the expense was created
  updatedAt: string; // ISO string for when the expense was last updated
};
