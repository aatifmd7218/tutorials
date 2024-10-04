import { NextRequest, NextResponse } from "next/server";
import fs, { writeFile } from "fs";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const data = await req.formData();
    const image = data.get("image");
    const title = data.get("title");
    const desc = data.get("desc");
    const content = data.get("content");
    let published = data.get("published");
    const publishDate = data.get("publishDate"); // Get publishDate from FormData
    const authorId = data.get("authorId");
    const featuredPost = data.get("featuredPost");
    let newBlog;
    let slug;

    const prisma = new PrismaClient();

    slug = title
      .toLowerCase() // Convert the title to lowercase
      .replace(/[^\w\s-]/g, "") // Remove non-word characters (excluding spaces and dashes)
      .trim() // Trim leading and trailing spaces
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/-+/g, "-");


      const publishDateObj = new Date(publishDate);
    if (isNaN(publishDateObj)) {
      return NextResponse.json(
        { error: "Invalid publishDate" },
        { status: 400 }
      );
    }

    newBlog = await prisma.blogt.create({
      data: {
        title,
        slug,
        description: desc,
        publishDate: publishDateObj,
        content,
        published,
        author_id: parseInt(authorId),
        featuredpost: featuredPost,
      },
    });

    if (image !== "") {
      const filenameParts = image.name.split(".");
      const fileExtension = filenameParts[filenameParts.length - 1];

      const blob = await put(`${slug}.${fileExtension}`, image, {
        access: "public",
      });

      await prisma.blogt.update({
        where: { id: newBlog.id },
        data: {
          image: blob.url,
        },
      });
    }

    return NextResponse.json({ result: "success" }, { status: 200 });

    // Respond with success message
  } catch (error) {
    console.error("Error during blog addition:", error);
    return NextResponse.json(
      { success1: false, error: "Failed to add blog" },
      { status: 500 }
    );
  }
}
