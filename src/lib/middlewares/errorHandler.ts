import type { Context } from "hono";
import type { Handler, Next } from "hono/types";
import { z } from "zod";
import { Prisma } from "../../generated/prisma";

export const withErrorHandler = (handler: Handler) => {
	return async (c: Context, next: Next): Promise<Response> => {
		try {
			return await handler(c, next);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return c.json({ error: error.errors }, 400);
			}
			if (process.env.NODE_ENV !== "production") {
				console.error(error);
			}
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					return c.json({ error: "Enregistrement non trouvé" }, 404);
				}
				if (error.code === "P2002") {
					return c.json({ error: "Cette valeur existe déjà" }, 409);
				}
			}
			return c.json(
				{ error: "Internal server error", details: String(error) },
				500,
			);
		}
	};
};
