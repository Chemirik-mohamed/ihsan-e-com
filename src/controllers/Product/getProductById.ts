import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import {
	productIdParamsSchema,
	productFoundResponseSchema,
} from "../../schemas/productSchema";

export const getProductById = async (c: Context): Promise<Response> => {
	const body = productIdParamsSchema.parse(c.req.param());

	const product = await prisma.product.findUnique({
		where: { id: body.id },
	});

	if (!product) {
		return c.json({ message: "Produit introuvable avec l'ID donné." }, 404);
	}

	const response = productFoundResponseSchema.parse({
		message: "Produit trouvé.",
		data: product,
	});

	return c.json(response);
};
