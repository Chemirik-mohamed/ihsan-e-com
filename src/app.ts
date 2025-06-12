import { Hono } from "hono";
import { securityMiddleware } from "./lib/middlewares/security";
import { corsMiddleware } from "./lib/middlewares/cors";
import { loggerMiddleware } from "./lib/middlewares/logger";

export const app = new Hono();

app.use("*", securityMiddleware);
app.use("*", corsMiddleware);
app.use("*", loggerMiddleware);

import { appRouter } from "./routes";

app.route("/api", appRouter);

app.get("/", (c) => {
	return c.json({
		message: "API E-COM",
		status: "running",
		cors: "localhost:3000 autorisé",
	});
});
