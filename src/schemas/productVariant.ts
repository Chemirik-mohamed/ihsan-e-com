import { z } from "zod";

// Base schema sans les champs automatiques (id, createdAt, etc.)
export const productVariantBaseSchema = z.object({
	name: z.string().min(1, "Le nom est requis"),
	color: z.string().min(1, "La couleur est requise"),
	sku: z.string().min(1, "Le SKU est requis"),
	isDefault: z.boolean().optional().default(false),
	productId: z.string().uuid("L'ID du produit doit être un UUID"),
	stock: z.number().int().min(0, "Le stock doit être un entier positif"),
});

// Schéma complet pour valider un ProductVariant récupéré depuis la BDD
export const productVariantSchema = productVariantBaseSchema.extend({
	id: z.string().uuid(),
	createdAt: z.date(),
	updatedAt: z.date(),
	deletedAt: z.date().nullable().optional(),
});

export type ProductVariantInput = z.infer<typeof productVariantBaseSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
