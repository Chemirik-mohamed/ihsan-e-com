import { Hono } from "hono";
import { createCategory } from "../controllers/category/createCategory";
import { withErrorHandler } from "../lib/middlewares/errorHandler";
import { authMiddleware } from "../lib/middlewares/auth";
import { isAdminMiddleware } from "../lib/middlewares/isAdmin";

export const categoryRouter = new Hono();

categoryRouter.post(
	"/",
	authMiddleware,
	isAdminMiddleware,
	withErrorHandler(createCategory),
);
