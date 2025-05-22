import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import {
	productVariantIdParamsSchema,
	productVariantSchema,
} from "../../schemas/productVariant";

export const deleteProductVariant = async (c: Context): Promise<Response> => {
	// 1. Récupérer l’ID de la variante à supprimer
	const params = productVariantIdParamsSchema.parse(c.req.param());

	// 2. Vérifier l'existence de la variante
	const existingVariant = await prisma.productVariant.findUnique({
		where: { id: params.id },
	});

	if (!existingVariant) {
		return c.json({ message: "Aucune variante trouvée pour l'ID donné." }, 404);
	}

	// 3. Supprimer la variante
	const deletedVariant = await prisma.productVariant.delete({
		where: { id: params.id },
	});

	// 4. Formater les dates pour la réponse
	const variantForResponse = {
		...deletedVariant,
		createdAt: deletedVariant.createdAt.toISOString(),
		updatedAt: deletedVariant.updatedAt.toISOString(),
		deletedAt: deletedVariant.deletedAt
			? deletedVariant.deletedAt.toISOString()
			: null,
	};

	// 5. Validation finale de la réponse
	const response = productVariantSchema.parse(variantForResponse);

	return c.json({
		message: "Variante supprimée avec succès.",
		data: response,
	});
};
