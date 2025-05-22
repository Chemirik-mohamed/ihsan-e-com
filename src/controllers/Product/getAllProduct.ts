import type { Context } from "hono";
import { getAllProducts } from "../../services/product/productService";
import { serializeLightProduct } from "../../types/product";

export const getAllProduct = async (c: Context): Promise<Response> => {
	const products = await getAllProducts();
	const data = products.map(serializeLightProduct);

	return c.json({
		message: "Liste des produits",
		count: data.length,
		data,
	});
};
