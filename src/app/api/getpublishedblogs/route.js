
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

// GET Handler: Fetch Published Blogs
export async function GET(req) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category"); 

  try {
    const blogs = await prisma.bloglivet.findMany({
      where: {
        published: "Y",
        ...(category && { category: { slug: category } })
      },
      include: {
        author: {
          select: {
            authorName: true,
          },
        },
      },
    });

    const processedBlogs = blogs.map(blog => ({
      ...blog,
      authorName: blog.author?.authorName || "Unknown", 
    }));

    return NextResponse.json({ result: processedBlogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    return NextResponse.json(
      { error: "Failed to get published blogs" },
      { status: 500 }
    );
  }
}


// POST Handler: Publish Scheduled Blogs
export async function POST(req) {
 
  const authHeader = req.headers.get("authorization");
  const SECRET_TOKEN = process.env.PUBLISHBLOGS_SECRET_TOKEN;

  if (authHeader !== `Bearer ${SECRET_TOKEN}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const currentDate = new Date();

   
    const blogsToPublish = await prisma.bloglivet.findMany({
      where: {
        published: "N",
        publishDate: {
          lte: currentDate,
        },
      },
    });

    for (const blog of blogsToPublish) {
      await prisma.bloglivet.update({
        where: { id: blog.id },
        data: { published: "Y" },
      });
      // console.log(`Published blog ID: ${blog.id}`);
    }

    return NextResponse.json(
      { result: `Published ${blogsToPublish.length} blogs.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during publishing scheduled blogs:", error);
    return NextResponse.json(
      { error: "Failed to publish blogs" },
      { status: 500 }
    );
  }
}
