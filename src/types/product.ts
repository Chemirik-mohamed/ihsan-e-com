import type { JsonValue } from "@prisma/client/runtime/library";
import type { ProductStatus } from "../generated/prisma";

export type LightProduct = {
	id: string;
	name: string;
	slug: string;
	sku: string;
	price: number;
	stock: number;
	status: ProductStatus;
	metadata?: JsonValue;
	description?: string | null;
	createdAt: Date;
};
export const serializeLightProduct = (product: LightProduct) => ({
	...product,
	createdAt: product.createdAt.toISOString(),
});
