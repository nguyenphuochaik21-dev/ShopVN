'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/utils'

// Mock data
const products = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    category: 'Điện tử',
    price: 32990000,
    comparePrice: 34990000,
    quantity: 50,
    sold: 1250,
    isFeatured: true,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&h=100&fit=crop'],
  },
  {
    id: '2',
    name: 'MacBook Air M3 13 inch',
    category: 'Điện tử',
    price: 28990000,
    quantity: 30,
    sold: 890,
    isFeatured: true,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop'],
  },
  {
    id: '3',
    name: 'AirPods Pro 2nd Generation',
    category: 'Điện tử',
    price: 5990000,
    comparePrice: 6990000,
    quantity: 100,
    sold: 2340,
    isFeatured: false,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&h=100&fit=crop'],
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Điện tử',
    price: 32990000,
    quantity: 0,
    sold: 567,
    isFeatured: true,
    isActive: false,
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop'],
  },
]

export default function AdminProductsPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sản phẩm</h1>
          <p className="text-muted-foreground">
            Quản lý tất cả sản phẩm trong cửa hàng
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Thêm sản phẩm
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
          <option value="">Tất cả danh mục</option>
          <option value="dien-tu">Điện tử</option>
          <option value="thoi-trang">Thời trang</option>
        </select>
        <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang bán</option>
          <option value="inactive">Ngừng bán</option>
        </select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Hình ảnh</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Kho</TableHead>
              <TableHead>Đã bán</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">SKU: PROD-{product.id}</p>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-primary">
                      {formatCurrency(product.price)}
                    </p>
                    {product.comparePrice && (
                      <p className="text-xs text-muted-foreground line-through">
                        {formatCurrency(product.comparePrice)}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={product.quantity === 0 ? 'text-red-500' : ''}>
                    {product.quantity}
                  </span>
                </TableCell>
                <TableCell>{product.sold}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {product.isActive ? (
                      <Badge variant="success">Đang bán</Badge>
                    ) : (
                      <Badge variant="secondary">Ngừng bán</Badge>
                    )}
                    {product.isFeatured && (
                      <Badge variant="info">Nổi bật</Badge>
                    )}
                  </div>
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
                        <Link href={`/products/${product.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Sửa
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Sao chép
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Hiển thị 1-10 trong 100 sản phẩm
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
            3
          </Button>
          <Button variant="outline" size="sm">
            Sau
          </Button>
        </div>
      </div>
    </div>
  )
}
