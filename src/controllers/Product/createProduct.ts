import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import {
	productBaseSchema,
	productCreatedResponseSchema,
} from "../../schemas/productSchema";

export const createProduct = async (c: Context): Promise<Response> => {
	const body = productBaseSchema.parse(await c.req.json());

	const existing = await prisma.product.findUnique({
		where: { slug: body.slug },
	});

	if (existing) {
		return c.json({ error: "produits existent." }, 409);
	}

	const product = await prisma.product.create({
		data: body,
	});

	const response = productCreatedResponseSchema.parse({
		message: "Produit créé.",
		data: product,
	});

	return c.json(response);
};
