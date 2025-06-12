import type { Context } from "hono";
import { hashPassword } from "../../lib/bcrypt";
import { generateToken } from "../../lib/jwt";
import { prisma } from "../../lib/prisma";
import { jwtSchema } from "../../schemas/jwtScheama";
import { schemaSignup } from "../../schemas/signupSchema";

export const signupUser = async (c: Context) => {
	const body = await c.req.json();

	const parsed = schemaSignup.parse(body);

	const hash = await hashPassword(parsed.password);

	const user = await prisma.user.create({
		data: {
			email: parsed.email,
			password: hash,
			name: parsed.name,
		},
	});

	const token = await generateToken(
		jwtSchema.parse({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		}),
	);

	return c.json({
		message: "Inscription réussie.",
		token,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
		},
	});
};
