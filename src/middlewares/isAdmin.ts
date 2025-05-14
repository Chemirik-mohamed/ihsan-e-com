import type { MiddlewareHandler } from "hono";

export const isAdminMiddleware: MiddlewareHandler = async (c, next) => {
	const user = c.get("user");

	if (!user || user.role !== "ADMIN") {
		return c.json({ message: "Utilisateur non autorisé." }, 403);
	}

	await next();
};
