import { z } from "zod";
import { ProductStatus } from "../generated/prisma";

// ✅ Paramètres d'URL pour :id
export const productIdParamsSchema = z.object({
	id: z.string().uuid(),
});

// ✅ Enum pour le status produit
export const productStatusEnum = z.nativeEnum(ProductStatus);

// ✅ Schéma de base pour création / modification
export const productBaseSchema = z.object({
	name: z.string().min(1, "Le nom du produit est requis"),
	slug: z.string().min(1, "Le slug est requis"),
	description: z.string().optional(),
	sku: z.string().min(1, "Le SKU est requis"),
	price: z.number().nonnegative("Le prix doit être positif ou nul"),
	stock: z.number().int().min(0, "Le stock doit être un entier positif"),
	status: productStatusEnum.default(ProductStatus.EN_STOCK),
	metadata: z.record(z.any()).optional(), // tu pourras le typer plus tard si tu veux
});

// ✅ Schéma pour update (tous les champs optionnels)
export const productUpdateSchema = productBaseSchema.partial();

// ✅ Schéma de réponse API (données typées en string, comme retournées par Prisma)
export const productResponseSchema = productBaseSchema.extend({
	id: z.string().uuid(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	deletedAt: z.string().datetime().nullable().optional(),
	variants: z.array(z.any()).optional(), // à typer plus tard
	images: z.array(z.any()).optional(),
	orderItems: z.array(z.any()).optional(),
});

// ✅ Schéma interne avec les vraies dates JavaScript (utilisé côté backend si besoin)
export const productSchema = productBaseSchema.extend({
	id: z.string().uuid(),
	createdAt: z.date(),
	updatedAt: z.date(),
	deletedAt: z.date().nullable().optional(),
	variants: z.array(z.any()).optional(),
	images: z.array(z.any()).optional(),
	orderItems: z.array(z.any()).optional(),
});

export const productFoundResponseSchema = z.object({
	message: z.literal("Produit trouvé."),
	data: productResponseSchema,
});

export const productCreatedResponseSchema = z.object({
	message: z.literal("Produit créé."),
	data: productResponseSchema,
});

// ✅ Schéma de réponse pour la suppression
export const productDeletedResponseSchema = z.object({
	message: z.literal("Produit supprimé."),
	data: productResponseSchema,
});

// ✅ Schéma de réponse pour la mise à jour
export const productUpdatedResponseSchema = z.object({
	message: z.literal("Produit mis à jour."),
	data: productResponseSchema,
});

// ✅ Schéma de réponse pour la liste
export const productListResponseSchema = z.object({
	message: z.string(),
	data: z.array(productResponseSchema),
});

// ✅ Types TypeScript utiles
export type ProductInput = z.infer<typeof productBaseSchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductDeletedResponse = z.infer<
	typeof productDeletedResponseSchema
>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
export type ProductFoundResponse = z.infer<typeof productFoundResponseSchema>;
