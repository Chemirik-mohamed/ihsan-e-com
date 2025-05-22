import { prisma } from "../../lib/prisma";
import type { LightProduct } from "../../types/product";

export async function getAllProducts(): Promise<LightProduct[]> {
	return prisma.product.findMany({
		select: {
			id: true,
			name: true,
			slug: true,
			sku: true,
			price: true,
			stock: true,
			status: true,
			description: true,
			metadata: true,
			createdAt: true,
		},
	});
}

export const serializeLightProduct = (product: LightProduct) => ({
	...product,
	createdAt: product.createdAt.toISOString(),
});
