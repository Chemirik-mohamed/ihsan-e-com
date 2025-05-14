import { Hono } from "hono";
import { signupUser } from "../controllers/user/signupUser";
import { withErrorHandler } from "../middlewares/errorHandler";
import { loginUser } from "../controllers/user/loginUser";

export const userRouter = new Hono();

userRouter.post("/signup", withErrorHandler(signupUser));
userRouter.post("/login", withErrorHandler(loginUser));
