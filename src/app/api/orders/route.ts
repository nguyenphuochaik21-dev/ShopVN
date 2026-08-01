import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateOrderNumber } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const where: Record<string, unknown> = {}

    // If not admin, only show user's orders
    const userRole = (session.user as { role?: string })?.role
    if (userRole !== 'ADMIN' && session.user?.id) {
      where.userId = session.user.id
    }

    if (status) {
      where.status = status
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          items: {
            include: {
              product: {
                select: {
                  images: true,
                },
              },
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ])

    return NextResponse.json({
      data: orders,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Orders API error:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const session = await auth()

    const {
      email,
      phone,
      shippingName,
      shippingPhone,
      shippingAddress,
      shippingCity,
      shippingDistrict,
      shippingWard,
      paymentMethod,
      note,
      couponCode,
      items,
    } = body

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    )

    // Calculate shipping fee
    const shippingFee = subtotal >= 500000 ? 0 : 30000

    // Calculate discount
    let discount = 0
    if (couponCode) {
      const coupon = await prisma.coupon.findFirst({
        where: {
          code: couponCode,
          isActive: true,
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
          quantity: { gt: 0 },
        },
      })

      if (coupon) {
        if (coupon.type === 'PERCENTAGE') {
          discount = (subtotal * Number(coupon.value)) / 100
          if (coupon.maxDiscount) {
            discount = Math.min(discount, Number(coupon.maxDiscount))
          }
        } else if (coupon.type === 'FIXED_AMOUNT') {
          discount = Number(coupon.value)
        } else if (coupon.type === 'FREE_SHIPPING') {
          discount = shippingFee
        }

        // Update coupon usage
        await prisma.coupon.update({
          where: { id: coupon.id },
          data: {
            usedCount: { increment: 1 },
            quantity: { decrement: 1 },
          },
        })
      }
    }

    const total = subtotal - discount + shippingFee

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session?.user?.id || null,
        email,
        phone,
        shippingName,
        shippingPhone,
        shippingAddress,
        shippingCity,
        shippingDistrict,
        shippingWard,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PENDING',
        subtotal,
        shippingFee,
        discount,
        total,
        couponCode,
        note,
        status: 'PENDING',
        items: {
          create: items.map((item: { productId: string; name: string; sku: string; image: string; price: number; quantity: number }) => ({
            productId: item.productId,
            name: item.name,
            sku: item.sku,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    // Clear cart if user is logged in
    if (session?.user?.id) {
      await prisma.cartItem.deleteMany({
        where: { userId: session.user.id },
      })
    }

    return NextResponse.json({ data: order }, { status: 201 })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi' },
      { status: 500 }
    )
  }
}
