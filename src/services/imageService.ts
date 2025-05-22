import { prisma } from "../lib/prisma";

export const createImage = (url: string, productId: string, altText?: string) =>
	prisma.image.create({
		data: { url, productId, altText },
	});
