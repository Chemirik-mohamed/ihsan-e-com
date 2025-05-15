import type { MiddlewareHandler } from "hono";
import type { Context } from "hono";
import { jwtSchema } from "../../schemas/jwtScheama";
import { verifyToken } from "../jwt";

export const authMiddleware: MiddlewareHandler = async (c: Context, next) => {
	const header = c.req.header("Authorization");
	if (!header?.startsWith("Bearer")) {
		return c.json({ message: "Token manquant ou mal formé" }, 401);
	}
	const token = header.replace("Bearer ", "");
	try {
		const rawPayload = await verifyToken(token);
		const payload = jwtSchema.parse(rawPayload);

		c.set("user", payload);

		await next();
	} catch (err) {
		return c.json({ error: "token invalide ou expiré" }, 401);
	}
};
