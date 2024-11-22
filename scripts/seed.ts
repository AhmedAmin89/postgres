import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("P@$$w0rd", 10);

  // Create admin user
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      email: "admin@example.com",
      username: "admin",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      isApproved: true,
    },
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });