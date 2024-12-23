import cors from "cors";

import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

import { hasDbFile, seed } from "./api/seed.ts";
import { appRouter } from "./router.ts";

if (!hasDbFile()) {
	await seed();
}

const app = express();
app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		middleware: cors(),
		router: appRouter,
	}),
);
app.listen(8000);
