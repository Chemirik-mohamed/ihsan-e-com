import type { Context } from "hono";
import { getUsersByEmail } from "../../services/user/userService";
import { serializeLightUser } from "../../types/user";

export const getAllUsers = async (c: Context): Promise<Response> => {
	const emailSearch = c.req.query("search")?.trim() || "";

	const users = await getUsersByEmail(emailSearch);

	const data = users.map(serializeLightUser);

	return c.json({
		message: emailSearch
			? "Résultat de recherche"
			: "Liste complète des utilisateurs",
		count: data.length,
		data,
	});
};
