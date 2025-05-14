import { z } from "zod";

export const jwtSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string().email(),
	role: z.enum(["CLIENT", "ADMIN"]),
	iat: z.number().optional(),
	exp: z.number().optional(),
});

export type JwtPayload = z.infer<typeof jwtSchema>;
