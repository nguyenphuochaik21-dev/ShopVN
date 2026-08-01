import { UserRole, OrderStatus, PaymentMethod, PaymentStatus, NotificationType } from '@prisma/client'

export interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  avatar: string | null
  role: UserRole
  emailVerified: Date | null
  isActive: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  parentId: string | null
  children?: Category[]
  productCount?: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  content: string | null
  price: number
  comparePrice: number | null
  sku: string | null
  quantity: number
  sold: number
  images: string[]
  video: string | null
  isFeatured: boolean
  isActive: boolean
  isFlashSale: boolean
  category?: Category
  categoryId: string | null
  reviewCount?: number
  averageRating?: number
  attributes?: ProductAttribute[]
}

export interface ProductAttribute {
  id: string
  name: string
  value: string
}

export interface CartItemType {
  id: string
  userId: string
  productId: string
  quantity: number
  product: Product
}

export interface Address {
  id: string
  name: string
  phone: string
  address: string
  city: string
  district: string | null
  ward: string | null
  isDefault: boolean
}

export interface Order {
  id: string
  orderNumber: string
  userId: string | null
  email: string
  phone: string
  status: OrderStatus
  subtotal: number
  shippingFee: number
  discount: number
  total: number
  couponCode: string | null
  note: string | null
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  shippingCity: string
  shippingDistrict: string | null
  shippingWard: string | null
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  paymentId: string | null
  items: OrderItem[]
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  name: string
  sku: string | null
  image: string
  price: number
  quantity: number
  total: number
  attributes: string | null
}

export interface Review {
  id: string
  userId: string
  productId: string
  rating: number
  title: string | null
  content: string
  images: string[]
  isVerified: boolean
  user: {
    name: string | null
    avatar: string | null
  }
  createdAt: Date
}

export interface Coupon {
  id: string
  code: string
  name: string
  description: string | null
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'
  value: number
  minOrderValue: number | null
  maxDiscount: number | null
  quantity: number
  usedCount: number
  startDate: Date
  endDate: Date
  isActive: boolean
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  content: string
  data?: Record<string, unknown>
  isRead: boolean
  createdAt: Date
}

export interface ChatMessage {
  id: string
  roomId: string
  senderId: string | null
  content: string
  type: 'TEXT' | 'IMAGE' | 'ORDER' | 'SYSTEM'
  isRead: boolean
  createdAt: Date
  sender?: {
    name: string | null
    avatar: string | null
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export interface FilterParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  isFeatured?: boolean
  isFlashSale?: boolean
}
