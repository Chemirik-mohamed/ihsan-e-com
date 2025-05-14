import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import {
	schemasParamUpdateRole,
	updateRoleSchema,
} from "../../schemas/userSchema";

export const updateRoleUser = async (c: Context) => {
	const params = schemasParamUpdateRole.parse(c.req.param());
	const body = updateRoleSchema.parse(await c.req.json());

	const updateUser = await prisma.user.update({
		where: { id: params.id },
		data: {
			role: body.role, // ✅ soit "ADMIN" soit "CLIENT"
		},
	});

	return c.json({
		message: "Rôle mis à jour avec succès.",
		user: {
			id: updateUser.id,
			email: updateUser.email,
			role: updateUser.role,
		},
	});
};
