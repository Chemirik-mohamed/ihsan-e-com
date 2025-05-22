import type { User } from "../../generated/prisma";

export const serializeUser = (user: User) => ({
	id: user.id,
	name: user.name ?? "",
	email: user.email,
	role: user.role,
	createdAt: user.createdAt.toISOString(),
});
