import { z } from "zod";
import type { Expense } from "../types/index.ts";

export const ExpenseSchema: z.ZodType<Expense> = z.object({
	id: z.string(),
	description: z.string().min(1, "Description is required"),
	amount: z.number().positive("Amount must be greater than 0"),
	interval: z.enum(["yearly", "monthly", "weekly", "custom"]),
	customIntervalDays: z.number().positive("Custom interval days must be greater than 0").optional(),
	date: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const ExpenseUpdateSchema = ExpenseSchema.pick({
	description: true,
	amount: true,
	interval: true,
	customIntervalDays: true,
	date: true,
}).partial();
