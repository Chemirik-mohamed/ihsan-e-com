import { Hono } from "hono";
import { uploadProductImage } from "../controllers/image/uploadImage";
import { withErrorHandler } from "../lib/middlewares/errorHandler";

export const imageCloudinaryRoute = new Hono();

imageCloudinaryRoute.post("/", withErrorHandler(uploadProductImage));
