import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export async function sendOrderConfirmation(order: {
  email: string
  orderNumber: string
  total: number
  items: Array<{ name: string; quantity: number; price: number }>
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #3b82f6;">Xác nhận đơn hàng</h1>
      <p>Cảm ơn bạn đã đặt hàng tại ShopVN!</p>
      <p><strong>Mã đơn hàng:</strong> ${order.orderNumber}</p>
      <p><strong>Tổng tiền:</strong> ${order.total.toLocaleString('vi-VN')}đ</p>
      <h2>Chi tiết đơn hàng:</h2>
      <ul>
        ${order.items.map(item => `
          <li>${item.name} x ${item.quantity} - ${(item.price * item.quantity).toLocaleString('vi-VN')}đ</li>
        `).join('')}
      </ul>
      <p>Chúng tôi sẽ gửi email thông báo khi đơn hàng được cập nhật.</p>
      <p>Trân trọng,<br>ShopVN</p>
    </div>
  `

  return sendEmail({
    to: order.email,
    subject: `Xác nhận đơn hàng ${order.orderNumber}`,
    html,
  })
}

export async function sendWelcomeEmail(email: string, name: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #3b82f6;">Chào mừng đến với ShopVN!</h1>
      <p>Xin chào ${name},</p>
      <p>Cảm ơn bạn đã đăng ký tài khoản tại ShopVN. Chúng tôi rất vui được phục vụ bạn!</p>
      <p>Bắt đầu mua sắm ngay hôm nay và khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/products" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Mua sắm ngay</a>
      <p>Trân trọng,<br>ShopVN</p>
    </div>
  `

  return sendEmail({
    to: email,
    subject: 'Chào mừng đến với ShopVN!',
    html,
  })
}
