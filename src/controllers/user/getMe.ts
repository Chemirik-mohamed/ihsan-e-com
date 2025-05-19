import type { Context } from "hono";

export const getMe = async (c: Context) => {
	const user = c.get("user");

	if (!user) {
		return c.json({ message: "Utilisateur non authentifié." }, 401);
	}
	return c.json({
		message: "Voici ton profil",
		user,
	});
};
