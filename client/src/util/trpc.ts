import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/router.ts";

export const trpc = createTRPCReact<AppRouter>();
