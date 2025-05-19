import type { MiddlewareHandler } from "hono";

export const isAdminMiddleware: MiddlewareHandler = async (c, next) => {
	const user = c.get("user");

	if (!user || user.role !== "ADMIN") {
		return c.json({ message: "Accès réservé aux administrateurs." }, 403);
	}

	await next();
};
