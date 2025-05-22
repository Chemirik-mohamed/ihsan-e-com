import type { Context } from "hono";
import { prisma } from "../../lib/prisma";
import {
	productVariantIdParamsSchema,
	productVariantSchema,
} from "../../schemas/productVariant";

export const getProductVariantById = async (c: Context): Promise<Response> => {
	const params = productVariantIdParamsSchema.parse(c.req.param());

	const variant = await prisma.productVariant.findUnique({
		where: { id: params.id },
	});

	if (!variant) {
		return c.json({ message: "Aucune variante trouvée avec cet ID." }, 404);
	}

	// Conversion des dates en string (format ISO)
	const variantForResponse = {
		...variant,
		createdAt: variant.createdAt.toISOString(),
		updatedAt: variant.updatedAt.toISOString(),
		deletedAt: variant.deletedAt ? variant.deletedAt.toISOString() : null,
	};

	// Validation finale avant réponse
	const response = productVariantSchema.parse(variantForResponse);

	return c.json({ message: "Variante trouvée.", data: response });
};
