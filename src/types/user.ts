import type { UserRole } from "../generated/prisma";

export type LightUser = {
	id: string;
	name: string | null;
	email: string;
	role: UserRole;
	createdAt: Date;
};

export const serializeLightUser = (user: LightUser) => ({
	...user,
	createdAt: user.createdAt.toISOString(),
});
