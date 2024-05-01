import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  try {
    const blogs = await prisma.bloglivet.findMany({
      where: { published: "Y" },
    });
    console.log("blogs", blogs);
    return NextResponse.json({ result: blogs }, { status: 200 });
  } catch (error) {
    console.error("Error during getting blogs data:", error);
    return NextResponse.json(
      { error: "Failed to get blogs data" },
      { status: 500 }
    );
  }
}
