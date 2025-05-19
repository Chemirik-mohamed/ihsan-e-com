import { Hono } from "hono";
import { createProduct } from "../controllers/Product/createProduct";
import { deleteProduct } from "../controllers/Product/deleteProduct";
import { getAllProduct } from "../controllers/Product/getAllProduct";
import { getProductById } from "../controllers/Product/getProductById";
import { updateProduct } from "../controllers/Product/updateProduct";
import { authMiddleware } from "../lib/middlewares/auth";
import { withErrorHandler } from "../lib/middlewares/errorHandler";
import { isAdminMiddleware } from "../lib/middlewares/isAdmin";

export const productRouter = new Hono();

productRouter.post(
	"/",
	authMiddleware,
	isAdminMiddleware,
	withErrorHandler(createProduct),
);
productRouter.get("/", withErrorHandler(getAllProduct));

productRouter.get("/:id", withErrorHandler(getProductById));

productRouter.patch("/:id", isAdminMiddleware, withErrorHandler(updateProduct));

productRouter.delete(
	"/:id",
	isAdminMiddleware,
	withErrorHandler(deleteProduct),
);
