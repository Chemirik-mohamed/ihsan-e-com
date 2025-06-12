import { Hono } from "hono";
import { createProductVariant } from "../controllers/productVariant/createProductVariant";
import { deleteProductVariant } from "../controllers/productVariant/deleteProductVariant";
import { getAllProductVariants } from "../controllers/productVariant/getAllProductVariants";
import { getProductVariantById } from "../controllers/productVariant/getProductVariantById";
import { updateProductVariant } from "../controllers/productVariant/updateProductVariant";
import { withErrorHandler } from "../lib/middlewares/errorHandler";
export const productVariantRouter = new Hono();

productVariantRouter.get("/", getAllProductVariants);
productVariantRouter.get("/:id", getProductVariantById);
productVariantRouter.post("/", withErrorHandler(createProductVariant));
productVariantRouter.patch("/:id", updateProductVariant);
productVariantRouter.delete("/:id", deleteProductVariant);
