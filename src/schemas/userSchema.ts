import { z } from "zod";

export const userResponse = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string().email(),
	role: z.enum(["CLIENT", "ADMIN"]),
	createdAt: z.string().datetime(),
});

export type userDto = z.infer<typeof userResponse>;

export const userListResponse = z.array(userResponse);

export const schemasParamUpdateRole = z.object({
	id: z.string().uuid(),
});

export const updateRoleSchema = z.object({
	role: z.enum(["ADMIN", "CLIENT"]),
});
