import { prisma } from "../../lib/prisma";

import type { Context } from "hono";
import { userListResponse } from "../../schemas/userSchema";

export const getAllUsers = async (c: Context): Promise<Response> => {
	const search = c.req.query("search")?.trim() || "";

	const users = await prisma.user.findMany({
		where: search
			? {
					OR: [{ email: { contains: search } }, { name: { contains: search } }],
				}
			: undefined,
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			createdAt: true,
		},
	});
	const parsed = userListResponse.parse(users);
	return c.json({
		message: search
			? "Résultat de recherche"
			: "Liste complète des utilisateurs",
		count: parsed.length,
		parsed,
	});
};
