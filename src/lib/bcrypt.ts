import bcrypt from "bcryptjs";

const SLAT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, SLAT_ROUNDS);
};

export const comparePassword = async (
	password: string,
	hashPassword: string,
): Promise<boolean> => {
	return await bcrypt.compare(password, hashPassword);
};
