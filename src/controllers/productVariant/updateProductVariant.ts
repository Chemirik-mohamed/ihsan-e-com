import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import {
	productVariantBaseSchema,
	productVariantIdParamsSchema,
	productVariantSchema,
} from "../../schemas/productVariant";

export const updateProductVariant = async (c: Context): Promise<Response> => {
	// 1. Récupérer l’ID de la variante (par ex. via params ou body)
	const params = productVariantIdParamsSchema.parse(c.req.param());

	// 2. Vérifier l'existence de la variante
	const existingVariant = await prisma.productVariant.findUnique({
		where: { id: params.id },
	});

	if (!existingVariant) {
		return c.json({ message: "Aucune variante trouvée pour l'ID donné." }, 404);
	}

	// 3. Valider les données reçues (on peut autoriser partial update si besoin)
	const data = productVariantBaseSchema.parse(await c.req.json());

	// 4. Vérifier l’unicité du SKU (si le SKU change)
	if (data.sku && data.sku !== existingVariant.sku) {
		const existingSku = await prisma.productVariant.findUnique({
			where: { sku: data.sku },
		});
		if (existingSku) {
			return c.json(
				{ error: "Ce SKU est déjà utilisé par une autre variante." },
				409,
			);
		}
	}

	// 5. Effectuer la mise à jour
	const updatedVariant = await prisma.productVariant.update({
		where: { id: params.id },
		data,
	});

	// 6. Formater les dates pour la réponse
	const variantForResponse = {
		...updatedVariant,
		createdAt: updatedVariant.createdAt.toISOString(),
		updatedAt: updatedVariant.updatedAt.toISOString(),
		deletedAt: updatedVariant.deletedAt
			? updatedVariant.deletedAt.toISOString()
			: null,
	};

	// 7. Validation finale de la réponse
	const response = productVariantSchema.parse(variantForResponse);

	return c.json({
		message: "Variante mise à jour.",
		data: response,
	});
};
