import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category')
    const sort = searchParams.get('sort') || 'newest'
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const isFeatured = searchParams.get('isFeatured')
    const isFlashSale = searchParams.get('isFlashSale')

    const where: Record<string, unknown> = {
      isActive: true,
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (category) {
      where.categoryId = category
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) (where.price as Record<string, unknown>).gte = parseFloat(minPrice)
      if (maxPrice) (where.price as Record<string, unknown>).lte = parseFloat(maxPrice)
    }

    if (isFeatured === 'true') {
      where.isFeatured = true
    }

    if (isFlashSale === 'true') {
      where.isFlashSale = true
    }

    const orderBy: Record<string, string> = {}
    switch (sort) {
      case 'price-asc':
        orderBy.price = 'asc'
        break
      case 'price-desc':
        orderBy.price = 'desc'
        break
      case 'popular':
        orderBy.sold = 'desc'
        break
      case 'rating':
        orderBy.sold = 'desc' // Simplified for now
        break
      default:
        orderBy.createdAt = 'desc'
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          reviews: {
            select: {
              rating: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ])

    // Transform data
    const transformedProducts = products.map((product) => {
      const averageRating =
        product.reviews.length > 0
          ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
          : 0

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        comparePrice: product.comparePrice,
        images: product.images,
        quantity: product.quantity,
        sold: product.sold,
        isFeatured: product.isFeatured,
        isFlashSale: product.isFlashSale,
        category: product.category,
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount: product.reviews.length,
      }
    })

    return NextResponse.json({
      data: transformedProducts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        content: body.content,
        price: body.price,
        comparePrice: body.comparePrice,
        sku: body.sku,
        quantity: body.quantity,
        images: body.images,
        video: body.video,
        isFeatured: body.isFeatured,
        isActive: body.isActive,
        isFlashSale: body.isFlashSale,
        categoryId: body.categoryId,
      },
    })

    return NextResponse.json({ data: product }, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi' },
      { status: 500 }
    )
  }
}
