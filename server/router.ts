import { z } from "zod";

import { db } from "./api/db.ts";
import { ExpenseSchema, FamilyMemberSchema } from "./schemas/index.ts";
import { publicProcedure, router } from "./trpc.ts";

export const appRouter = router({
	expenses: {
		list: publicProcedure.query(async () => {
			const expenses = await db.expenses.findMany();
			return expenses;
		}),
		create: publicProcedure.input(ExpenseSchema).mutation(async (opts) => {
			const { input } = opts;
			const expense = await db.expenses.create(input);
			return expense;
		}),
		byId: publicProcedure.input(z.string()).query(async (opts) => {
			const { input } = opts;
			const expense = await db.expenses.findById(input);
			return expense;
		}),
	},
	familyMembers: {
		list: publicProcedure.query(async () => {
			const familyMembers = await db.familyMembers.findMany();
			return familyMembers;
		}),
		create: publicProcedure.input(FamilyMemberSchema).mutation(async (opts) => {
			const { input } = opts;
			const familyMember = await db.familyMembers.create(input);
			return familyMember;
		}),
		byId: publicProcedure.input(z.string()).query(async (opts) => {
			const { input } = opts;
			const familyMember = await db.familyMembers.findById(input);
			return familyMember;
		}),
	},
	examples: {
		iterable: publicProcedure.query(async function* () {
			for (let i = 0; i < 3; i++) {
				await new Promise((resolve) => setTimeout(resolve, 500));
				yield i;
			}
		}),
	},
});

// Export type router type signature, this is used by the client.
export type AppRouter = typeof appRouter;
