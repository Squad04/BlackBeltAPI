import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmin() {
  await prisma.role.upsert({
    where: {
      name: "user",
    },
    update: {},
    create: {
      name: "user",
    },
  });

  const adminEmail = "admin@email.com";
  const adminPassword = await hash("password943", 10);

  const adminRole = await prisma.role.upsert({
    where: {
      name: "admin",
    },
    update: {},
    create: {
      name: "admin",
    },
  });

  await prisma.user.upsert({
    where: {
      email: adminEmail,
    },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      password: adminPassword,
      roleId: adminRole.id,
      isAdmin: true,
    },
  });

  console.log("Admin created successfully");
}

seedAdmin()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
