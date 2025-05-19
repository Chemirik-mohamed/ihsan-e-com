import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import { productListResponseSchema } from "../../schemas/productSchema";

export const getAllProduct = async (c: Context): Promise<Response> => {
	const products = await prisma.product.findMany({
		select: {
			id: true,
			name: true,
			price: true,
			variants: true,
			images: true,
			description: true,
			status: true,
			slug: true,
			metadata: true,
			createdAt: true,
			deletedAt: true,
			updatedAt: true,
			orderItems: true,
			sku: true,
			stock: true,
		},
	});

	if (products.length === 0) {
		return c.json({ message: "Aucun produit trouvé", data: [] }, 200);
	}
	const response = productListResponseSchema.parse({
		message: "Tous les produits",
		data: products,
	});
	return c.json(response);
};
