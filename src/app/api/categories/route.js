
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handling GET and POST requests
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request) {
  const { categoryName } = await request.json();

  // Validate input
  if (!categoryName) {
    return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
  }

  try {
    const category = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add category' }, { status: 500 });
  }
}
