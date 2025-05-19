import type { Product } from "../../generated/prisma";
export const serializeProduct = (product: Product) => ({
	...product,
	createdAt: product.createdAt.toISOString(),
	updatedAt: product.updatedAt.toISOString(),
	deletedAt: product.deletedAt ? product.deletedAt.toISOString() : null,
});
