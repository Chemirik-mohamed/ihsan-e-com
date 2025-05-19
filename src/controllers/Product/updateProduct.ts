import type { Context } from "hono";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import {
	productIdParamsSchema,
	productUpdateSchema,
	productUpdatedResponseSchema,
} from "../../schemas/productSchema";

export const updateProduct = async (c: Context): Promise<Response> => {
	const params = productIdParamsSchema.parse(c.req.param());
	const body = productUpdateSchema.parse(await c.req.json());

	const productUpdate = await prisma.product.update({
		where: { id: params.id },
		data: {
			name: body.name,
			slug: body.slug,
			description: body.description,
			sku: body.sku,
			price: body.price,
			stock: body.stock,
			status: body.status,
			metadata: body.metadata,
		},
	});
	const response = productUpdatedResponseSchema.parse({
		message: "Produit mis à jour.",
		data: productUpdate,
	});
	return c.json(response);
};
