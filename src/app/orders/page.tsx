import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, ChevronRight, Eye, Search } from 'lucide-react'
import type { Metadata } from 'next'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Đơn hàng của tôi | ShopVN',
  description: 'Theo dõi và quản lý đơn hàng',
}

const statusConfig = {
  PENDING: { label: 'Chờ xác nhận', variant: 'secondary' as const, color: 'text-yellow-600' },
  CONFIRMED: { label: 'Đã xác nhận', variant: 'secondary' as const, color: 'text-blue-600' },
  PROCESSING: { label: 'Đang đóng gói', variant: 'secondary' as const, color: 'text-purple-600' },
  SHIPPING: { label: 'Đang giao hàng', variant: 'default' as const, color: 'text-orange-600' },
  DELIVERED: { label: 'Hoàn thành', variant: 'default' as const, color: 'text-green-600' },
  CANCELLED: { label: 'Đã hủy', variant: 'destructive' as const, color: 'text-red-600' },
  REFUNDED: { label: 'Đã hoàn tiền', variant: 'outline' as const, color: 'text-gray-600' },
}

const paymentConfig = {
  PENDING: { label: 'Chờ thanh toán', color: 'text-yellow-600' },
  PAID: { label: 'Đã thanh toán', color: 'text-green-600' },
  FAILED: { label: 'Thanh toán thất bại', color: 'text-red-600' },
  REFUNDED: { label: 'Đã hoàn tiền', color: 'text-gray-600' },
}

async function getOrders(userId: string) {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        take: 3,
      },
    },
  })
  return orders
}

export default async function OrdersPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/orders')
  }

  const orders = await getOrders(session.user.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Đơn hàng của tôi</span>
          </div>

          <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h2 className="text-xl font-semibold mb-2">Chưa có đơn hàng nào</h2>
                  <p className="text-muted-foreground mb-6">
                    Hãy bắt đầu mua sắm để tạo đơn hàng đầu tiên của bạn
                  </p>
                  <Link href="/products">
                    <Button>Khám phá sản phẩm</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const status = statusConfig[order.status]
                const payment = paymentConfig[order.paymentStatus]

                return (
                  <Card key={order.id}>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Mã đơn hàng: </span>
                            <span className="font-mono font-medium">{order.orderNumber}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={status.variant} className={status.color}>
                            {status.label}
                          </Badge>
                          <span className={`text-sm ${payment.color}`}>{payment.label}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Order Items Preview */}
                        <div className="flex-1">
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="relative w-16 h-16 rounded border bg-muted shrink-0"
                              >
                                <img
                                  src={item.image || '/placeholder.png'}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                            ))}
                            {order.items.length === 0 && (
                              <div className="text-sm text-muted-foreground italic">
                                Không có hình ảnh
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {order.items.length} sản phẩm
                          </p>
                        </div>

                        {/* Order Summary */}
                        <div className="shrink-0 md:w-48">
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Tạm tính:</span>
                              <span>{formatCurrency(Number(order.subtotal))}</span>
                            </div>
                            {Number(order.discount) > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Giảm giá:</span>
                                <span>-{formatCurrency(Number(order.discount))}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Phí ship:</span>
                              <span>
                                {Number(order.shippingFee) === 0
                                  ? 'Miễn phí'
                                  : formatCurrency(Number(order.shippingFee))}
                              </span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                              <span>Tổng cộng:</span>
                              <span className="text-primary">{formatCurrency(Number(order.total))}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="shrink-0">
                          <Link href={`/orders/${order.id}`}>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Eye className="h-4 w-4" />
                              Chi tiết
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="mt-4 pt-4 border-t text-sm">
                        <span className="text-muted-foreground">Giao đến: </span>
                        <span>
                          {order.shippingName} - {order.shippingPhone}, {order.shippingAddress}, {order.shippingCity}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
