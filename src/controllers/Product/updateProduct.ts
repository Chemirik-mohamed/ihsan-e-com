import type { Context } from "hono";
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
			categorySlug: body.categorySlug,
			metadata: body.metadata ?? undefined,
		},
	});
	const productForResponse = {
		...productUpdate,
		createdAt: productUpdate.createdAt.toISOString(),
		updatedAt: productUpdate.updatedAt.toISOString(),
	};

	const response = productUpdatedResponseSchema.parse({
		message: "Produit mis à jour.",
		data: productForResponse,
	});
	return c.json(response);
};
