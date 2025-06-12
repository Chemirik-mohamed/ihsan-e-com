import type { MiddlewareHandler } from "hono";

const allowedOrigins = ["http://localhost:3000"];

export const corsMiddleware: MiddlewareHandler = async (c, next) => {
	const origin = c.req.header("Origin");

	if (origin && allowedOrigins.includes(origin)) {
		c.header("Access-Control-Allow-Origin", origin);
	}

	c.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, OPTIONS",
	);

	c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

	c.header("Access-Control-Allow-Credentials", "true");

	if (c.req.method === "OPTIONS") {
		return c.text("", 200);
	}

	await next();
};
