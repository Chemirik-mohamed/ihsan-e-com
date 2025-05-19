import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import {
	productDeletedResponseSchema,
	productIdParamsSchema,
} from "../../schemas/productSchema";

export const deleteProduct = async (c: Context): Promise<Response> => {
	const params = productIdParamsSchema.parse(c.req.param());

	const existingProduct = await prisma.product.findUnique({
		where: { id: params.id },
	});

	if (!existingProduct) {
		return c.json({ message: "Aucun produit trouvé pour l'ID donné." }, 404);
	}

	const deletedProduct = await prisma.product.delete({
		where: { id: params.id },
	});

	const response = productDeletedResponseSchema.parse({
		message: "Produit supprimé.",
		data: deletedProduct,
	});

	return c.json(response);
};
