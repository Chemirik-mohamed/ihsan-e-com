import { cloudinary } from "../lib/cloudinary";

export const uploadToCloudinary = (buffer: Buffer, sku: string) =>
	new Promise<{ secure_url: string }>((resolve, reject) => {
		const folder = `ihsan-products/${sku}`; // dossier par produit
		const stream = cloudinary.uploader.upload_stream(
			{ folder },
			(error, result) => {
				if (error) return reject(error);
				if (!result) return reject(new Error("No result from Cloudinary"));
				resolve(result as { secure_url: string });
			},
		);
		stream.end(buffer);
	});
