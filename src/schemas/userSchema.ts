import { z } from "zod";

export const userResponse = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string().email(),
	role: z.enum(["CLIENT", "ADMIN"]),
	createdAt: z.date(),
});

export type userDto = z.infer<typeof userResponse>;

const userListResponse = z.array(userResponse);
