import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import {
	productVariantBaseSchema,
	productVariantSchema,
} from "../../schemas/productVariant";
export const createProductVariant = async (c: Context): Promise<Response> => {
	// 1. Valider les données reçues avec Zod (input utilisateur)
	const data = productVariantBaseSchema.parse(await c.req.json());

	const product = await prisma.product.findUnique({
		where: { id: data.productId },
	});

	if (!product) {
		return c.json(
			{
				error:
					"Impossible de créer la variante : le produit spécifié n'existe pas.",
			},
			404,
		);
	}

	// 3. Créer la variante en base
	const variant = await prisma.productVariant.create({
		data,
	});

	// 4. Formater les dates en string ISO pour la réponse
	const variantForResponse = {
		...variant,
		createdAt: variant.createdAt.toISOString(),
		updatedAt: variant.updatedAt.toISOString(),
		deletedAt: variant.deletedAt ? variant.deletedAt.toISOString() : null,
	};

	// 5. Validation finale de la réponse (bonne pratique)
	const response = productVariantSchema.parse(variantForResponse);

	return c.json({
		message: "Variante créée avec succès.",
		data: response,
	});
};
