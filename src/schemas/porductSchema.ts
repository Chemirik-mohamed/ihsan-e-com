import { z } from "zod";

// Enum TypeScript si tu veux le réutiliser ailleurs
export const productStatusEnum = z.enum(["EN_STOCK", "RUPTURE", "ARCHIVE"]);

export const productBaseSchema = z.object({
	name: z.string().min(1, "Le nom du produit est requis"),
	slug: z.string().min(1, "Le slug est requis"),
	description: z.string().optional(),
	sku: z.string().min(1, "Le SKU est requis"),
	price: z.number().nonnegative("Le prix doit être positif ou nul"),
	stock: z.number().int().min(0, "Le stock doit être un entier positif"),
	status: productStatusEnum.default("EN_STOCK"),
	metadata: z.record(z.any()).optional(), // ou `z.unknown().optional()` si tu préfères
});

export const productSchema = productBaseSchema.extend({
	id: z.string().uuid(),
	createdAt: z.date(),
	updatedAt: z.date(),
	deletedAt: z.date().nullable().optional(),
	// Relations (non requises ici, juste pour info)
	variants: z.array(z.any()).optional(), // tu peux remplacer `any` par un schéma précis plus tard
	images: z.array(z.any()).optional(),
	orderItems: z.array(z.any()).optional(),
});

export type ProductInput = z.infer<typeof productBaseSchema>;
export type Product = z.infer<typeof productSchema>;
