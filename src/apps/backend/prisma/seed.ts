import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const unitRecords = [
    { id: 1, name: "x" },
    { id: 2, name: "ml" },
    { id: 3, name: "l" },
    { id: 4, name: "g" },
    { id: 5, name: "kg" },
  ];

  for (const unitRecord of unitRecords) {
    await prisma.unit.upsert({
      where: {
        id: unitRecord.id,
      },
      update: {
        ...unitRecord,
      },
      create: {
        ...unitRecord,
      },
    });
  }

  console.log(`upsert units :: ${unitRecords.length} items`);

  const categoryRecords = [
    { id: 1, name: "Vorspeise" },
    { id: 2, name: "Hauptspeise" },
    { id: 3, name: "Nachspeise" },
    { id: 4, name: "Beilage" },
    { id: 5, name: "Snack" },
  ];

  for (const categoryRecord of categoryRecords) {
    await prisma.category.upsert({
      where: {
        id: categoryRecord.id,
      },
      update: {
        ...categoryRecord,
      },
      create: {
        ...categoryRecord,
      },
    });
  }

  console.log(`upsert categories :: ${categoryRecords.length} items`);
}

main()
  .then(async () => {
    console.log("DONE");

    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();
    process.exit(1);
  });
