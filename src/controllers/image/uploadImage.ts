import type { Context } from "hono";
import slugify from "slugify";
import { prisma } from "../../lib/prisma";
import { uploadImageFormSchema } from "../../schemas/imageUploadschema";
import { uploadToCloudinary } from "../../services/cloudinaryService";
import { createImage } from "../../services/imageService";

export const uploadProductImage = async (c: Context): Promise<Response> => {
	const formData = await c.req.formData();
	const file = formData.get("file");
	const sku = formData.get("sku");
	const altText = formData.get("altText");

	// 1. Validation form (si error, gérée par handler global)
	const parsed = uploadImageFormSchema.parse({ sku, altText });

	// 2. Validation fichier (manuelle, ici car pas gérée par Zod)
	if (!(file instanceof File)) {
		return c.json({ error: "Aucun fichier fourni." }, 400);
	}
	if (!file.type.startsWith("image/")) {
		return c.json({ error: "Le fichier n'est pas une image." }, 400);
	}
	if (file.size > 5 * 1024 * 1024) {
		return c.json({ error: "Fichier trop volumineux (max 5 Mo)." }, 400);
	}

	// 3. Vérification du produit
	const product = await prisma.product.findUnique({
		where: { sku: parsed.sku },
	});
	if (!product) {
		return c.json({ error: "Produit introuvable pour ce SKU." }, 404);
	}

	// 4. Préparation du dossier Cloudinary (slugifié)
	const folderName = slugify(parsed.sku);

	// 5. Upload Cloudinary
	const buffer = Buffer.from(await file.arrayBuffer());
	const { secure_url } = await uploadToCloudinary(
		buffer,
		`ihsan-products/${folderName}`,
	);

	// 6. Création BDD
	const image = await createImage(secure_url, product.id, parsed.altText);

	// 7. Réponse
	return c.json({
		message: "Image uploadée et enregistrée.",
		data: image,
	});
};
