import { Hono } from "hono";
import { getMe } from "../controllers/user/getMe";
import { loginUser } from "../controllers/user/loginUser";
import { signupUser } from "../controllers/user/signupUser";
import { authMiddleware } from "../middlewares/auth";
import { withErrorHandler } from "../middlewares/errorHandler";

export const userRouter = new Hono();

userRouter.post("/signup", withErrorHandler(signupUser));
userRouter.post("/login", withErrorHandler(loginUser));
userRouter.get("/me", authMiddleware, getMe);
