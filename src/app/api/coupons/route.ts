import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (code) {
      // Validate a specific coupon
      const coupon = await prisma.coupon.findFirst({
        where: {
          code: code.toUpperCase(),
          isActive: true,
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
          quantity: { gt: 0 },
        },
      })

      if (!coupon) {
        return NextResponse.json(
          { message: 'Mã coupon không hợp lệ hoặc đã hết hạn' },
          { status: 404 }
        )
      }

      return NextResponse.json({ data: coupon })
    }

    // Get all coupons
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data: coupons })
  } catch (error) {
    console.error('Coupons API error:', error)
    return NextResponse.json({ message: 'Đã xảy ra lỗi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      code,
      name,
      description,
      type,
      value,
      minOrderValue,
      maxDiscount,
      quantity,
      startDate,
      endDate,
      productIds,
    } = body

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        name,
        description,
        type,
        value,
        minOrderValue,
        maxDiscount,
        quantity,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        products: productIds?.length
          ? {
              create: productIds.map((productId: string) => ({
                productId,
              })),
            }
          : undefined,
      },
    })

    return NextResponse.json({ data: coupon }, { status: 201 })
  } catch (error) {
    console.error('Create coupon error:', error)
    return NextResponse.json({ message: 'Đã xảy ra lỗi' }, { status: 500 })
  }
}
