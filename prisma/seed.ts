import { prisma } from "../src/lib/prisma";

import { hashPassword } from "../src/lib/bcrypt";

async function main() {
	const password = await hashPassword("admin123");

	const admin = await prisma.user.upsert({
		where: { email: "admin@ihsan.com" },
		update: {},
		create: {
			email: "admin@ihsan.com",
			name: "Admin Ihsan",
			password,
			role: "ADMIN",
		},
	});
	console.log("✅ Admin created:", admin);
}

main().catch((e) => {
	console.error(e);
});
