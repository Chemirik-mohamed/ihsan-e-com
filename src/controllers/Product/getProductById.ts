import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import {
	productFoundResponseSchema,
	productIdParamsSchema,
} from "../../schemas/productSchema";
import { serializeLightProduct } from "../../types/product";

export const getProductById = async (c: Context): Promise<Response> => {
	const body = productIdParamsSchema.parse(c.req.param());

	const product = await prisma.product.findUnique({
		where: { id: body.id },
		include: {
			variants: true,
			category: true,
		},
	});

	if (!product) {
		return c.json({ message: "Produit introuvable avec l'ID donné." }, 404);
	}
	const productForResponse = {
		...product,
		createdAt: product.createdAt.toISOString(),
		updatedAt: product.updatedAt.toISOString(),
		deletedAt: product.deletedAt?.toISOString() ?? null,
		category: product.category
			? {
					...product.category,
					createdAt: product.category.createdAt.toISOString(),
					updatedAt: product.category.updatedAt.toISOString(),
				}
			: null,
		variants: product.variants.map((variant) => ({
			...variant,
			createdAt: variant.createdAt.toISOString(),
			updatedAt: variant.updatedAt.toISOString(),
			deletedAt: variant.deletedAt?.toISOString() ?? null,
		})),
	};

	const response = productFoundResponseSchema.parse({
		message: "Produit trouvé.",
		data: productForResponse,
	});

	return c.json(response);
};
