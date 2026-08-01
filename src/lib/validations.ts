import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
})

export const profileSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional().or(z.literal('')),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Mật khẩu hiện tại không đúng'),
  password: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
})

export const addressSchema = z.object({
  name: z.string().min(2, 'Tên người nhận phải có ít nhất 2 ký tự'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').max(11),
  address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
  city: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
  district: z.string().min(1, 'Vui lòng chọn quận/huyện'),
  ward: z.string().optional(),
  isDefault: z.boolean().default(false),
})

export const checkoutSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').max(11),
  shippingName: z.string().min(2, 'Tên người nhận phải có ít nhất 2 ký tự'),
  shippingPhone: z.string().min(10, 'Số điện thoại không hợp lệ').max(11),
  shippingAddress: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
  shippingCity: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
  shippingDistrict: z.string().optional(),
  shippingWard: z.string().optional(),
  paymentMethod: z.enum(['COD', 'STRIPE', 'VNPAY', 'BANK_TRANSFER']),
  note: z.string().optional(),
  couponCode: z.string().optional(),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Tên sản phẩm phải có ít nhất 2 ký tự'),
  slug: z.string().min(2, 'Slug phải có ít nhất 2 ký tự'),
  description: z.string().optional(),
  content: z.string().optional(),
  price: z.coerce.number().min(0, 'Giá phải lớn hơn 0'),
  comparePrice: z.coerce.number().min(0).optional(),
  sku: z.string().optional(),
  quantity: z.coerce.number().min(0).default(0),
  categoryId: z.string().optional(),
  images: z.array(z.string()).min(1, 'Cần ít nhất 1 hình ảnh'),
  video: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  isFlashSale: z.boolean().default(false),
  attributes: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })).optional(),
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Tên danh mục phải có ít nhất 2 ký tự'),
  slug: z.string().min(2, 'Slug phải có ít nhất 2 ký tự'),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
})

export const couponSchema = z.object({
  code: z.string().min(2, 'Mã coupon phải có ít nhất 2 ký tự').toUpperCase(),
  name: z.string().min(2, 'Tên coupon phải có ít nhất 2 ký tự'),
  description: z.string().optional(),
  type: z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING']),
  value: z.coerce.number().min(0, 'Giá trị phải lớn hơn 0'),
  minOrderValue: z.coerce.number().min(0).optional(),
  maxDiscount: z.coerce.number().min(0).optional(),
  quantity: z.coerce.number().min(1, 'Số lượng phải lớn hơn 0'),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  productIds: z.array(z.string()).optional(),
})

export const reviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string().min(10, 'Nội dung đánh giá phải có ít nhất 10 ký tự'),
  images: z.array(z.string()).optional(),
})

export const chatMessageSchema = z.object({
  content: z.string().min(1, 'Nội dung không được trống'),
  type: z.enum(['TEXT', 'IMAGE']).default('TEXT'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type ProfileInput = z.infer<typeof profileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type ProductInput = z.infer<typeof productSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type CouponInput = z.infer<typeof couponSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type ChatMessageInput = z.infer<typeof chatMessageSchema>
