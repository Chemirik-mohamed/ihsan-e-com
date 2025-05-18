import type { Context } from "hono";

export const getMe = async (c: Context) => {
	const user = c.get("user");
	return c.json({
		message: "Voici ton profil",
		user,
	});
};
