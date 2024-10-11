import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const now = new Date();
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

      res.status(200).json({ message: "Scheduled blogs processed." });
    } catch (error) {
      console.error("Error publishing scheduled blogs:", error);
      res.status(500).json({ error: "Error publishing scheduled blogs." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}