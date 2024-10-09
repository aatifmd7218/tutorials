const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

cron.schedule("* * * * *", async () => {
  const now = new Date();
  console.log(now);
  const blogsToPublish = await prisma.blogt.findMany({
    where: {
      published: "N",
      publishDate: {
        lte: now,
      },
    },
  });

  for (const blog of blogsToPublish) {
    await prisma.bloglivet.create({
      data: {
        title: blog.title,
        description: blog.description,
        content: blog.content,
        image: blog.image,
        publishDate: blog.publishDate,
        slug: blog.slug,
        published: "Y",
        delete_request: blog.delete_request,
        author_id: blog.author_id,
        featuredpost: blog.featuredpost,
      },
    });
    await prisma.blogt.delete({ where: { id: blog.id } });
  }
});

console.log("Cron job is running...");
