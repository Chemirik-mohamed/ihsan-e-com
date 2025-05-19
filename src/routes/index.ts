import { Hono } from "hono";
import { productRouter } from "./productRouter";
import { userRouter } from "./userRouter";

export const appRouter = new Hono();

appRouter.route("/users", userRouter);
appRouter.route("/products", productRouter);
