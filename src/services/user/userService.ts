import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { userListResponse } from "../../schemas/userSchema";
import type { userDto } from "../../schemas/userSchema";

export async function getUsersByEmail(
	emailSearch?: string,
): Promise<userDto[]> {
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

	return userListResponse.parse(users);
}
