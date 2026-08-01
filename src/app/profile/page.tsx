import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, MapPin, User, CreditCard, Bell } from 'lucide-react'
import type { Metadata } from 'next'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Hồ sơ của tôi | ShopVN',
  description: 'Quản lý thông tin cá nhân và địa chỉ giao hàng',
}

async function getUserData(userId: string) {
  const [user, addresses, orders, wishlists] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    }),
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.wishlist.count({
      where: { userId },
    }),
  ])
  return { user, addresses, orders, wishlists }
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/profile')
  }

  const { user, addresses, orders, wishlists } = await getUserData(session.user.id)

  if (!user) {
    redirect('/auth/login')
  }

  const menuItems = [
    {
      icon: User,
      title: 'Thông tin cá nhân',
      description: 'Cập nhật thông tin tài khoản',
      href: '/profile/edit',
    },
    {
      icon: MapPin,
      title: 'Địa chỉ giao hàng',
      description: `${addresses.length} địa chỉ`,
      href: '/profile/addresses',
    },
    {
      icon: Package,
      title: 'Đơn hàng của tôi',
      description: 'Xem lịch sử đơn hàng',
      href: '/orders',
    },
    {
      icon: Bell,
      title: 'Thông báo',
      description: 'Cài đặt thông báo',
      href: '/profile/notifications',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Hồ sơ của tôi</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={user.avatar || ''} alt={user.name || ''} />
                    <AvatarFallback className="text-2xl">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-lg">{user.name || 'Người dùng'}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge variant="outline" className="mt-2">
                    {user.role === 'ADMIN' ? 'Quản trị viên' : 'Khách hàng'}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    Tham gia: {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Số điện thoại</span>
                    <span>{user.phone || 'Chưa cập nhật'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Địa chỉ</span>
                    <span>{addresses.length} địa chỉ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Yêu thích</span>
                    <span>{wishlists} sản phẩm</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Menu Items */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Đơn hàng gần đây</CardTitle>
                      <CardDescription>Các đơn hàng mới nhất của bạn</CardDescription>
                    </div>
                    <Link href="/orders">
                      <Button variant="ghost" size="sm">Xem tất cả</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Bạn chưa có đơn hàng nào</p>
                      <Link href="/products">
                        <Button className="mt-4">Bắt đầu mua sắm</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{order.orderNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(Number(order.total))}</p>
                            <Badge
                              variant={
                                order.status === 'DELIVERED'
                                  ? 'default'
                                  : order.status === 'CANCELLED'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {order.status === 'PENDING' && 'Chờ xác nhận'}
                              {order.status === 'CONFIRMED' && 'Đã xác nhận'}
                              {order.status === 'PROCESSING' && 'Đang xử lý'}
                              {order.status === 'SHIPPING' && 'Đang giao'}
                              {order.status === 'DELIVERED' && 'Hoàn thành'}
                              {order.status === 'CANCELLED' && 'Đã hủy'}
                              {order.status === 'REFUNDED' && 'Đã hoàn tiền'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
