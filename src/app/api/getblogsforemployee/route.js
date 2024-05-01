import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function POST(req, res) {
  try {
    const body = await req.json();
    let { employeeId } = body;

    employeeId = parseInt(employeeId);

    const blogs = await prisma.$queryRaw`
    SELECT *
    FROM (
      SELECT
        b.id,
        b.title,
        b.description,
        b.content,
        b.image,
        b.slug,
        b.published,
        b.delete_request,
        b.author_id,
        b.bloglive_id,
        b.featuredpost
      FROM public."Blogt" b
      WHERE b.author_id = ${employeeId}
    
      UNION ALL
    
      SELECT
        bl.id,
        bl.title,
        bl.description,
        bl.content,
        bl.image,
        bl.slug,
        bl.published,
        bl.delete_request,
        bl.author_id,
        null,
        bl.featuredpost
      FROM public."Bloglivet" bl
      LEFT JOIN public."Blogt" b ON bl.id = b.bloglive_id
      WHERE bl.author_id = ${employeeId} and b.bloglive_id IS NULL
    ) AS combined
    ORDER BY title;
    `;

    return NextResponse.json({ result: blogs }, { status: 200 });
  } catch (error) {
    console.error("Error during blog fetching:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
