import { z } from "zod";
export const uploadImageFormSchema = z.object({
	sku: z.string().min(1, "SKU manquant ou vide."),
	altText: z.string().optional(),
});
