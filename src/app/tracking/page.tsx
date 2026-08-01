'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockOrder = {
  orderNumber: 'ORD-2024-001234',
  status: 'SHIPPING',
  estimatedDelivery: '2024-08-05',
  items: [
    { name: 'iPhone 15 Pro Max 256GB', quantity: 1, price: 32990000 },
    { name: 'AirPods Pro 2', quantity: 1, price: 6990000 },
  ],
  timeline: [
    { date: '2024-08-01 14:30', status: 'ordered', title: 'Đơn hàng đã đặt', description: 'Chờ xác nhận' },
    { date: '2024-08-01 15:00', status: 'confirmed', title: 'Đã xác nhận', description: 'Đơn hàng được xác nhận' },
    { date: '2024-08-02 09:00', status: 'processing', title: 'Đang đóng gói', description: 'Sản phẩm đang được đóng gói' },
    { date: '2024-08-02 14:00', status: 'shipping', title: 'Đang giao hàng', description: 'Giao hàng tiết kiệm - Dự kiến 05/08/2024' },
    { date: null, status: 'delivered', title: 'Hoàn thành', description: 'Giao hàng thành công' },
  ],
}

const statusConfig = {
  PENDING: { label: 'Chờ xác nhận', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  CONFIRMED: { label: 'Đã xác nhận', icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  PROCESSING: { label: 'Đang đóng gói', icon: Package, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  SHIPPING: { label: 'Đang giao hàng', icon: Truck, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  DELIVERED: { label: 'Hoàn thành', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
  CANCELLED: { label: 'Đã hủy', icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' },
}

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('')
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setSearched(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header placeholder */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl">ShopVN</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Theo dõi đơn hàng</h1>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Nhập mã đơn hàng hoặc số điện thoại để tra cứu tình trạng đơn hàng của bạn
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-lg mx-auto">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Nhập mã đơn hàng (VD: ORD-2024-001234)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="h-12 text-lg"
                />
                <Button type="submit" size="lg" disabled={loading} className="h-12">
                  {loading ? 'Đang tìm...' : 'Tra cứu'}
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {searched ? (
              <div className="max-w-3xl mx-auto">
                {/* Order Info */}
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-mono">{mockOrder.orderNumber}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ngày đặt: 01/08/2024
                        </p>
                      </div>
                      <Badge className={statusConfig[mockOrder.status as keyof typeof statusConfig].bgColor}>
                        <span className={statusConfig[mockOrder.status as keyof typeof statusConfig].color}>
                          {statusConfig[mockOrder.status as keyof typeof statusConfig].label}
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Truck className="h-4 w-4" />
                      <span>Dự kiến giao: {mockOrder.estimatedDelivery}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tiến trình giao hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Vertical line */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                      {/* Timeline items */}
                      <div className="space-y-6">
                        {mockOrder.timeline.map((item, index) => {
                          const isCompleted = item.date !== null
                          const isCurrent = item.status === mockOrder.status

                          return (
                            <div key={index} className="relative flex items-start gap-4 pl-12">
                              <div
                                className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                  isCompleted
                                    ? isCurrent
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-green-100 text-green-600'
                                    : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5" />
                                ) : (
                                  <Clock className="h-5 w-5" />
                                )}
                              </div>
                              <div className={isCompleted ? '' : 'opacity-50'}>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                {item.date && (
                                  <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Details */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Chi tiết đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                          </div>
                          <p className="font-medium">
                            {new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}đ
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="max-w-lg mx-auto text-center py-12">
                <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h2 className="text-xl font-semibold mb-2">Tra cứu đơn hàng</h2>
                <p className="text-muted-foreground">
                  Nhập mã đơn hàng để xem thông tin vận chuyển chi tiết
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground mb-4">
              Bạn cần hỗ trợ về đơn hàng?
            </p>
            <Link href="/contact">
              <Button variant="outline">Liên hệ hỗ trợ</Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer placeholder */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 ShopVN. Tất cả quyền được bảo lưu.
        </div>
      </footer>
    </div>
  )
}
