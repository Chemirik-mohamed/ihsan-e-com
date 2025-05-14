import type { Context } from "hono";

import { jwtSchema } from "../../schemas/jwtScheama";

export const getMe = async (c: Context) => {
	const rawUser = c.get("user");
	const user = jwtSchema.parse(rawUser);
	return c.json({
		message: "Voici ton profil",
		user,
	});
};
