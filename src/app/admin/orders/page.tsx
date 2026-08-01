'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Download, Eye, MoreHorizontal, CheckCircle, XCircle, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock data
const orders = [
  {
    id: 'ORD-001-ABC123',
    customer: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0912 345 678',
    items: 3,
    total: 32990000,
    status: 'pending',
    payment: 'paid',
    createdAt: '2024-01-15 10:30',
  },
  {
    id: 'ORD-002-DEF456',
    customer: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0987 654 321',
    items: 2,
    total: 28990000,
    status: 'processing',
    payment: 'paid',
    createdAt: '2024-01-15 09:15',
  },
  {
    id: 'ORD-003-GHI789',
    customer: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0932 156 789',
    items: 1,
    total: 5990000,
    status: 'shipping',
    payment: 'paid',
    createdAt: '2024-01-14 16:45',
  },
  {
    id: 'ORD-004-JKL012',
    customer: 'Phạm Thị D',
    email: 'phamthid@email.com',
    phone: '0903 257 159',
    items: 4,
    total: 45790000,
    status: 'delivered',
    payment: 'paid',
    createdAt: '2024-01-13 11:20',
  },
  {
    id: 'ORD-005-MNO345',
    customer: 'Hoàng Văn E',
    email: 'hoangvane@email.com',
    phone: '0978 654 321',
    items: 1,
    total: 1999000,
    status: 'cancelled',
    payment: 'refunded',
    createdAt: '2024-01-12 14:30',
  },
]

const statusConfig = {
  pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  processing: { label: 'Đang đóng gói', color: 'bg-purple-100 text-purple-800', icon: Package },
  shipping: { label: 'Đang giao', color: 'bg-orange-100 text-orange-800', icon: Truck },
  delivered: { label: 'Hoàn thành', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800', icon: XCircle },
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Đơn hàng</h1>
          <p className="text-muted-foreground">
            Quản lý tất cả đơn hàng trong cửa hàng
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Xuất Excel
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="processing">Đang xử lý</option>
          <option value="shipping">Đang giao</option>
          <option value="delivered">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
        <input
          type="date"
          className="h-10 rounded-md border border-input bg-background px-3 py-2"
        />
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thanh toán</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="font-mono font-medium">{order.id}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items} sản phẩm</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${status.color} gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.payment === 'paid' ? 'success' : 'secondary'}>
                      {order.payment === 'paid' ? 'Đã thanh toán' : 'Đã hoàn tiền'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(order.createdAt, 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Chi tiết
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {order.status === 'pending' && (
                          <>
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                              Xác nhận đơn
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="h-4 w-4 mr-2" />
                              Hủy đơn
                            </DropdownMenuItem>
                          </>
                        )}
                        {order.status === 'confirmed' && (
                          <DropdownMenuItem>
                            <Truck className="h-4 w-4 mr-2" />
                            Bắt đầu giao
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Hiển thị 1-10 trong 100 đơn hàng
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Trước
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            Sau
          </Button>
        </div>
      </div>
    </div>
  )
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  )
}
