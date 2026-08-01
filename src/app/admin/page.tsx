import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock data
const stats = [
  {
    title: 'Doanh thu',
    value: '125.5M',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
  },
  {
    title: 'Đơn hàng',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-blue-600',
  },
  {
    title: 'Khách hàng',
    value: '5,678',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Sản phẩm',
    value: '890',
    change: '-2.1%',
    trend: 'down',
    icon: Package,
    color: 'text-orange-600',
  },
]

const recentOrders = [
  {
    id: 'ORD001',
    customer: 'Nguyễn Văn A',
    product: 'iPhone 15 Pro Max',
    total: '32,990,000đ',
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: 'ORD002',
    customer: 'Trần Thị B',
    product: 'MacBook Air M3',
    total: '28,990,000đ',
    status: 'processing',
    date: '2024-01-15',
  },
  {
    id: 'ORD003',
    customer: 'Lê Văn C',
    product: 'AirPods Pro 2',
    total: '5,990,000đ',
    status: 'shipped',
    date: '2024-01-14',
  },
  {
    id: 'ORD004',
    customer: 'Phạm Thị D',
    product: 'Samsung Galaxy S24',
    total: '32,990,000đ',
    status: 'delivered',
    date: '2024-01-14',
  },
]

const topProducts = [
  { name: 'iPhone 15 Pro Max', sold: 156, revenue: '5.14B' },
  { name: 'MacBook Air M3', sold: 89, revenue: '2.58B' },
  { name: 'AirPods Pro 2', sold: 234, revenue: '1.40B' },
  { name: 'Apple Watch Series 9', sold: 78, revenue: '935M' },
  { name: 'iPad Pro M2', sold: 45, revenue: '1.03B' },
]

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Chào mừng bạn quay trở lại! Đây là tổng quan về cửa hàng của bạn.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">so với tháng trước</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Đơn hàng gần đây</CardTitle>
              <CardDescription>5 đơn hàng mới nhất</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">Xem tất cả</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center font-medium">
                      {order.customer[0]}
                    </div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.product} • {order.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <Badge
                      variant="secondary"
                      className={`${statusColors[order.status as keyof typeof statusColors]} text-xs`}
                    >
                      {order.status === 'pending' && 'Chờ xác nhận'}
                      {order.status === 'processing' && 'Đang xử lý'}
                      {order.status === 'shipped' && 'Đang giao'}
                      {order.status === 'delivered' && 'Hoàn thành'}
                      {order.status === 'cancelled' && 'Đã hủy'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sản phẩm bán chạy</CardTitle>
              <CardDescription>Top 5 sản phẩm theo doanh thu</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/products">Xem tất cả</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sold} đã bán
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/admin/products/new">
                <Package className="h-5 w-5" />
                <span>Thêm sản phẩm</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/admin/categories/new">
                <Package className="h-5 w-5" />
                <span>Thêm danh mục</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/admin/coupons/new">
                <Package className="h-5 w-5" />
                <span>Tạo mã giảm giá</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/admin/analytics">
                <Package className="h-5 w-5" />
                <span>Xem thống kê</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
