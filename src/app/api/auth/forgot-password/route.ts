import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Always return success to prevent email enumeration
    // This is a security best practice
    if (!user) {
      return NextResponse.json(
        { success: true, message: 'Nếu email tồn tại, link đặt lại mật khẩu đã được gửi' },
        { status: 200 }
      )
    }

    // Generate reset token (in production, you would store this in a token table)
    // For now, we'll just log it
    const resetToken = Buffer.from(`${user.id}-${Date.now()}-reset`).toString('base64')

    // TODO: Send email with reset link
    // In production, integrate with Nodemailer:
    // await sendResetPasswordEmail(user.email, resetToken)

    console.log(`Password reset requested for: ${email}`)
    console.log(`Reset token: ${resetToken}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Nếu email tồn tại, link đặt lại mật khẩu đã được gửi',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}
