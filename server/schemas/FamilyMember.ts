import z from "zod";
import type { FamilyMember } from "../types/index.ts";

export const FamilyMemberSchema: z.ZodType<FamilyMember> = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, "Name is required"),
	email: z.string().email().optional(),
	sharePercentage: z.number().min(0).max(100).optional(),
});
