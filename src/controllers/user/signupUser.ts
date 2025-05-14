import type { Context } from "hono";
import { hashPassword } from "../../lib/bcrypt";
import { prisma } from "../../lib/prisma";
import { schemaSignup } from "../../schemas/signupSchema";

export const signupUser = async (c: Context) => {
	const body = await c.req.json();

	const parsed = schemaSignup.parse(body);

	const existing = await prisma.user.findUnique({
		where: { email: parsed.email },
	});

	if (existing) {
		throw new Error("Email déjà utilisé");
	}

	const hash = await hashPassword(parsed.password);

	const user = await prisma.user.create({
		data: {
			email: parsed.email,
			password: hash,
			name: parsed.name,
		},
	});

	return c.json({
		message: "Inscription réussie.",
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
		},
	});
};
