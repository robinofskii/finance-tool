import { join } from "@std/path";
import { Expense, FamilyMember } from "../types/index.ts";

const dataPath = join("data", "data.json");

async function readData<T>(key: string): Promise<T[]> {
  const data = await Deno.readTextFile(dataPath);
  const parsedData = JSON.parse(data);

  return parsedData[key];
}

async function writeData<T>(key: string, data: T[]): Promise<void> {
  await Deno.writeTextFile(dataPath, JSON.stringify({ [key]: data }));
}

export const db = {
  expenses: {
    async findMany(): Promise<Expense[]> {
      return await readData<Expense>("expenses");
    },
    async create(expense: Expense): Promise<Expense> {
      const expenses = await readData<Expense>("expenses");
      expenses.push(expense);
      await writeData("expenses", expenses);
      return expense;
    },
    async findById(id: string): Promise<Expense | undefined> {
      const expenses = await readData<Expense>("expenses");
      return expenses.find((expense) => expense.id === id);
    },
  },
  familyMembers: {
    async findMany(): Promise<FamilyMember[]> {
      return await readData<FamilyMember>("familyMembers");
    },
    async create(familyMember: FamilyMember): Promise<FamilyMember> {
      const familyMembers = await readData<FamilyMember>("familyMembers");
      familyMembers.push(familyMember);
      await writeData("familyMembers", familyMembers);
      return familyMember;
    },
    async findById(id: string): Promise<FamilyMember | undefined> {
      const familyMembers = await readData<FamilyMember>("familyMembers");
      return familyMembers.find((familyMember) => familyMember.id === id);
    },
  },
};
