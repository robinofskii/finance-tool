import { z } from "zod";
import { Expense } from "../types/index.ts";

export const ExpenseSchema: z.ZodType<Expense> = z.object({
  id: z.string().uuid(),
  description: z.string().min(1, "Description is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  interval: z.enum(["yearly", "monthly", "weekly", "custom"]),
  customIntervalDays: z.number().positive("Amount must be greater than").optional(),
  date: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
