import { z } from "zod";

export const productVariantIdParamsSchema = z.object({
	id: z.string().uuid("L'ID fourni doit être un UUID valide."),
});

// Schéma pour la création/mise à jour (input utilisateur)
export const productVariantBaseSchema = z.object({
	name: z.string().min(1, "Le nom est requis"),
	color: z.string().min(1, "La couleur est requise"),
	sku: z.string().min(1, "Le SKU est requis"),
	isDefault: z.boolean().optional().default(false),
	productId: z.string().uuid("L'ID du produit doit être un UUID"),
	stock: z.number().int().min(0, "Le stock doit être un entier positif"),
});

// ✅ Schéma pour l'update partiel (tous les champs optionnels)
export const productVariantUpdateSchema = productVariantBaseSchema.partial();

// Schéma de réponse API (côté frontend : tout en string sauf stock/isDefault)
export const productVariantSchema = productVariantBaseSchema.extend({
	id: z.string().uuid(),
	createdAt: z.string(), // <- string ISO
	updatedAt: z.string(),
	deletedAt: z.string().nullable().optional(),
});

export type ProductVariantInput = z.infer<typeof productVariantBaseSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
