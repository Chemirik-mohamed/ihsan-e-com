import type { Context } from "hono";
import { prisma } from "../../lib/prisma";

const getAllProduct = async (c: Context): Promise<Response> => {
	const product = await prisma.product.findMany({});
};
