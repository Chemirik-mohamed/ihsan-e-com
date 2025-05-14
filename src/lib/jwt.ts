import { SignJWT } from "jose";
import { jwtVerify } from "jose";
import { jwtSchema, type JwtPayload } from "../schemas/jwtScheama";

import "dotenv/config";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateToken = async (payload: JwtPayload): Promise<string> => {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(secret);
};

export const verifyToken = async (token: string): Promise<JwtPayload> => {
	try {
		const { payload } = await jwtVerify(token, secret);
		return jwtSchema.parse(payload);
	} catch (error) {
		throw new Error("Token invalide ou expiré");
	}
};
