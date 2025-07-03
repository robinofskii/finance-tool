import { join } from "@std/path";
import { nanoid } from "nanoid";
import type { Expense, FamilyMember } from "../types/index.ts";

const dataDir = "data";
const dataPath = join(dataDir, "data.json");

type db = {
	expenses: Expense[];
	familyMembers: FamilyMember[];
};

export const hasDbFile = () => {
	try {
		Deno.statSync(dataPath);
		return true;
	} catch {
		return false;
	}
};

export const seed = async () => {
	const data: db = {
		expenses: [
			{
				id: nanoid(),
				description: "Rent",
				amount: 850,
				interval: "monthly",
				date: "2021-01-01",
				createdAt: "2021-01-01",
				updatedAt: "2021-01-01",
			},
			{
				id: nanoid(),
				description: "Groceries",
				amount: 50,
				interval: "weekly",
				date: "2021-01-01",
				createdAt: "2021-01-01",
				updatedAt: "2021-01-01",
			},
		],
		familyMembers: [
			{
				id: nanoid(),
				name: "Robin",
			},
			{
				id: nanoid(),
				name: "Michele",
			},
		],
	};
	await Deno.mkdir(dataDir, { recursive: true });
	await Deno.writeTextFile(dataPath, JSON.stringify(data));
};
