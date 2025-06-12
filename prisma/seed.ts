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
	await prisma.category.deleteMany();
	await prisma.user.deleteMany();

	// Hash
	const passwordHash = await bcrypt.hash("motdepasse123", SALT_ROUNDS);
	const passwordAdmin = await bcrypt.hash("admin1234", SALT_ROUNDS);

	// Seed users

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

	// seed category

	await prisma.category.createMany({
		data: [
			{
				name: "Homme",
				slug: "homme",
			},
			{
				name: "Femme",
				slug: "femme",
			},
		],
	});

	console.log("✅ Catégories insérées avec succès");

	// seed product

	await prisma.product.createMany({
		data: [
			{
				name: "produit 1",
				slug: "produit-slug",
				description: "test product",
				sku: "product-IP15P-128",
				price: 1199.99,
				stock: 50,
				status: "EN_STOCK",
				categorySlug: "homme",
			},
		],
	});
	console.log("✅ Produits insérés avec succès");
}
// seed product
main()
	.catch((e) => {
		console.error("Erreur lors du seed :", e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
