import { Hono } from "hono";
import { imageCloudinaryRoute } from "./imageCloudinary";
import { productRouter } from "./productRouter";
import { productVariantRouter } from "./productVariantRouter";
import { userRouter } from "./userRouter";
import { categoryRouter } from "./categoryRouter";
export const appRouter = new Hono();

appRouter.route("/users", userRouter);
appRouter.route("/products", productRouter);
appRouter.route("/variants", productVariantRouter);
appRouter.route("/upload", imageCloudinaryRoute);
appRouter.route("/categories", categoryRouter);
