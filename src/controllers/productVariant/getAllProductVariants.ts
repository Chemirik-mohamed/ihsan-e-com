import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import { productVariantSchema } from "../../schemas/productVariant";

export const getAllProductVariants = async (c: Context): Promise<Response> => {
	const variants = await prisma.productVariant.findMany();

	// Conversion des dates pour chaque variant
	const variantsForResponse = variants.map((variant) => ({
		...variant,
		createdAt: variant.createdAt.toISOString(),
		updatedAt: variant.updatedAt.toISOString(),
		deletedAt: variant.deletedAt ? variant.deletedAt.toISOString() : null,
	}));

	// Validation avec Zod pour tous les variants (optionnel mais plus propre)
	const validated = variantsForResponse.map((variant) =>
		productVariantSchema.parse(variant),
	);

	return c.json({
		message: "Liste des variantes récupérée.",
		data: validated,
	});
};
