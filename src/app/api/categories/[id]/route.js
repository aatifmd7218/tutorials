
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handling PUT and DELETE requests
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const { name } = body; 


  if (!name) {
    return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
  }

  try {
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name }, 
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error); 
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error); 
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
