import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null, // Only top-level categories
      },
      include: {
        children: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ data: categories })
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json({ message: 'Đã xảy ra lỗi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, image, parentId } = body

    // Check if slug exists
    const existing = await prisma.category.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { message: 'Slug đã tồn tại' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        parentId: parentId || null,
      },
    })

    return NextResponse.json({ data: category }, { status: 201 })
  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi' },
      { status: 500 }
    )
  }
}
