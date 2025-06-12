import type { MiddlewareHandler } from "hono";

export const loggerMiddleware: MiddlewareHandler = async (c, next) => {
	if (process.env.NODE_ENV === "production") {
		await next();
		return;
	}

	const start = Date.now();
	const method = c.req.method;
	const url = c.req.url;

	console.log(`🔄 ${method} ${url}`);

	await next();

	const end = Date.now();
	const duration = end - start;

	const color = duration < 100 ? "🟢" : duration < 500 ? "🟡" : "🔴";
	console.log(`${color} ${method} ${url} - ${duration}ms`);
};
