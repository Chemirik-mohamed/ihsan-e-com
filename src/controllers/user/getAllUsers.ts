import type { Context } from "hono";
import { userListResponse } from "../../schemas/userSchema";
import { getUsersByEmail } from "../../services/user/userService";

export const getAllUsers = async (c: Context): Promise<Response> => {
	const emailSearch = c.req.query("search")?.trim() || "";

	const users = await getUsersByEmail(emailSearch);

	const parsed = userListResponse.parse(users);
	return c.json({
		message: emailSearch
			? "Résultat de recherche"
			: "Liste complète des utilisateurs",
		count: parsed.length,
		data: parsed,
	});
};
