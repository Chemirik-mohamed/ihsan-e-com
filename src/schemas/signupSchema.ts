import { z } from "zod";

export const schemaSignup = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	name: z.string().min(3).optional(),
});

export type inputschemaSignup = z.infer<typeof schemaSignup>;

export const schemaLogin = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export type loginInput = z.infer<typeof schemaLogin>;
