import type { Context } from "hono";
import { CategorySchema } from "../../schemas/ategorySchema";
import { prisma } from "../../lib/prisma";

export const createCategory = async (c: Context): Promise<Response> => {
	const body = await c.req.json();
	const parsed = CategorySchema.parse(body);

	const category = await prisma.category.create({
		data: {
			name: parsed.name,
			slug: parsed.slug,
		},
	});

	return c.json({
		message: "Category created successfully",
		data: category,
	});
};
