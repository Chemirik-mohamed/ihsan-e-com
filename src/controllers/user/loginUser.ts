import type { Context } from "hono";
import { comparePassword } from "../../lib/bcrypt";
import { generateToken } from "../../lib/jwt";
import { prisma } from "../../lib/prisma";
import { type loginInput, schemaLogin } from "../../schemas/signupSchema";
import { jwtSchema } from "../../schemas/jwtScheama";

export const loginUser = async (c: Context): Promise<Response> => {
	const body = await c.req.json();

	const parsed: loginInput = schemaLogin.parse(body);

	const existing = await prisma.user.findUnique({
		where: { email: parsed.email },
	});

	if (!existing) {
		throw new Error("Email ou mot de passe incorrect");
	}

	const compare = await comparePassword(parsed.password, existing.password);

	if (!compare) {
		throw new Error("Email ou mot de passe incorrect");
	}

	const token = await generateToken(jwtSchema.parse({
		id : existing.id,
		name:existing.name,
		email : existing.email,
		role : existing.role
	}));

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
