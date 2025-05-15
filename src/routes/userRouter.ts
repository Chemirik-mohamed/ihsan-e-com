import { Hono } from "hono";
import { getAllUsers } from "../controllers/user/getAllUsers";
import { getMe } from "../controllers/user/getMe";
import { loginUser } from "../controllers/user/loginUser";
import { signupUser } from "../controllers/user/signupUser";
import { updateRoleUser } from "../controllers/user/updateUserRole";
import { authMiddleware } from "../lib/middlewares/auth";
import { withErrorHandler } from "../lib/middlewares/errorHandler";
import { isAdminMiddleware } from "../lib/middlewares/isAdmin";

export const userRouter = new Hono();

userRouter.post("/signup", withErrorHandler(signupUser));
userRouter.post("/login", withErrorHandler(loginUser));
userRouter.get("/me", authMiddleware, withErrorHandler(getMe));
userRouter.patch(
	"/:id/role",
	authMiddleware,
	isAdminMiddleware,
	withErrorHandler(updateRoleUser),
);
userRouter.get(
	"/",
	authMiddleware,
	isAdminMiddleware,
	withErrorHandler(getAllUsers),
);
