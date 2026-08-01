import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ data: [] })
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            comparePrice: true,
            images: true,
            quantity: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data: cartItems })
  } catch (error) {
    console.error('Cart API error:', error)
    return NextResponse.json({ message: 'Đã xảy ra lỗi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Vui lòng đăng nhập' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity = 1 } = body

    // Check if product exists and has enough stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json({ message: 'Sản phẩm không tồn tại' }, { status: 404 })
    }

    if (product.quantity < quantity) {
      return NextResponse.json({ message: 'Sản phẩm không đủ số lượng' }, { status: 400 })
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    })

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              images: true,
            },
          },
        },
      })
      return NextResponse.json({ data: updatedItem })
    }

    // Add to cart
    const cartItem = await prisma.cartItem.create({
      data: {
        userId: session.user.id,
        productId,
        quantity,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            images: true,
          },
        },
      },
    })

    return NextResponse.json({ data: cartItem }, { status: 201 })
  } catch (error) {
    console.error('Add to cart error:', error)
    return NextResponse.json({ message: 'Đã xảy ra lỗi' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (productId) {
      await prisma.cartItem.deleteMany({
        where: {
          userId: session.user.id,
          productId,
        },
      })
    } else {
      // Clear entire cart
      await prisma.cartItem.deleteMany({
        where: { userId: session.user.id },
      })
    }

    return NextResponse.json({ message: 'Xóa thành công' })
  } catch (error) {
    console.error('Delete cart error:', error)
    return NextResponse.json({ message: 'Đã xảy ra lỗi' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity } = body

    if (quantity <= 0) {
      await prisma.cartItem.deleteMany({
        where: {
          userId: session.user.id,
          productId,
        },
      })
    } else {
      await prisma.cartItem.updateMany({
        where: {
          userId: session.user.id,
          productId,
        },
        data: { quantity },
      })
    }

    return NextResponse.json({ message: 'Cập nhật thành công' })
  } catch (error) {
    console.error('Update cart error:', error)
    return NextResponse.json({ message: 'Đã xảy ra lỗi' }, { status: 500 })
  }
}
