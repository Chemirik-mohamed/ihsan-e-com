import { Hono } from "hono";
import { userRouter } from "./userRouter";

export const appRouter = new Hono();

appRouter.route("/users", userRouter);
