const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    // Delete all data from tables, be sure to order correctly for foreign keys
    await prisma.tutorialSubtopicLive.deleteMany();
    await prisma.tutorialSubtopic.deleteMany();
    await prisma.tutorialTopic.deleteMany();
    await prisma.bloglivet.deleteMany();
    await prisma.blogt.deleteMany();
    await prisma.favicont.deleteMany();
    await prisma.category.deleteMany();
    await prisma.usert.deleteMany();

    console.log("All data deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();