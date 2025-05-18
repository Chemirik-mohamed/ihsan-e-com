import type { Context } from "hono";
import { comparePassword } from "../../lib/bcrypt";
import { generateToken } from "../../lib/jwt";
import { prisma } from "../../lib/prisma";
import { jwtSchema } from "../../schemas/jwtScheama";
import { type loginInput, schemaLogin } from "../../schemas/signupSchema";

export const loginUser = async (c: Context): Promise<Response> => {
	const body = await c.req.json();

	const parsed: loginInput = schemaLogin.parse(body);

	const existing = await prisma.user.findUnique({
		where: { email: parsed.email },
	});

	if (!existing) {
		return c.json({ error: "Email ou mot de passe incorrect" }, 401);
	}

	const compare = await comparePassword(parsed.password, existing.password);

	if (!compare) {
		return c.json({ error: "Email ou mot de passe incorrect" }, 401);
	}

	const token = await generateToken(
		jwtSchema.parse({
			id: existing.id,
			name: existing.name,
			email: existing.email,
			role: existing.role,
		}),
	);

	return c.json({
		message: "Connexion réussie. ",
		token,
		user: {
			id: existing.id,
			name: existing.name,
			email: existing.email,
			role: existing.role,
		},
	});
};
