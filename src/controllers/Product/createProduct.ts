import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import {
	productBaseSchema,
	productCreatedResponseSchema,
} from "../../schemas/productSchema";

export const createProduct = async (c: Context): Promise<Response> => {
	const body = productBaseSchema.parse(await c.req.json());

	const product = await prisma.product.create({
		data: body,
	});

	const productForResponse = {
		...product,
		createdAt: product.createdAt.toISOString(),
		updatedAt: product.updatedAt.toISOString(),
	};

	const response = productCreatedResponseSchema.parse({
		message: "Produit créé.",
		data: productForResponse,
	});

	return c.json(response);
};
