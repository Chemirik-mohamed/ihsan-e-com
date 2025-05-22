import { date } from "zod";
import type { Prisma, User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import type { LightUser } from "../../types/user";

export async function getUsersByEmail(
	emailSearch?: string,
): Promise<LightUser[]> {
	const filter: Prisma.UserWhereInput = emailSearch
		? {
				email: {
					contains: emailSearch,
					mode: "insensitive",
				},
			}
		: {};

	const users = await prisma.user.findMany({
		where: filter,
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			createdAt: true,
		},
	});

	return users;
}
