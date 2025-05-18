import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
	// Reset
	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();
	await prisma.image.deleteMany();
	await prisma.productVariant.deleteMany();
	await prisma.product.deleteMany();
	await prisma.user.deleteMany();

	// Hash
	const passwordHash = await bcrypt.hash("motdepasse123", SALT_ROUNDS);
	const passwordAdmin = await bcrypt.hash("admin1234", SALT_ROUNDS);

	// Seed

	await prisma.user.createMany({
		data: [
			{
				email: "client1@example.com",
				password: passwordHash,
				name: "Client One",
				role: "CLIENT",
			},
			{
				email: "client2@example.com",
				password: passwordHash,
				name: "Client Two",
				role: "CLIENT",
			},
			{
				email: "client3@example.com",
				password: passwordHash,
				name: "Client Three",
				role: "CLIENT",
			},
			{
				email: "admin@example.com",
				password: passwordAdmin,
				name: "Admin",
				role: "ADMIN",
			},
		],
	});
	console.log("✅ Utilisateurs insérés avec succès");
}

main()
	.catch((e) => {
		console.error("Erreur lors du seed :", e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
