'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, CreditCard, Truck, CheckCircle, Lock } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartDrawer } from '@/components/shop/cart-drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/cart-store'
import { checkoutSchema, type CheckoutInput } from '@/lib/validations'
import { cn, formatCurrency } from '@/lib/utils'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, couponCode, discount, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('COD')

  const subtotal = getSubtotal()
  const shippingFee = subtotal >= 500000 ? 0 : 30000
  const total = subtotal - discount + shippingFee

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'COD',
    },
  })

  const onSubmit = async (data: CheckoutInput) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and redirect to success
      clearCart()
      router.push('/checkout/success?order=' + Math.random().toString(36).substring(7))
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
            <Button asChild>
              <Link href="/products">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back link */}
          <Link
            href="/cart"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Quay lại giỏ hàng
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold mb-8">Thanh toán</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact */}
              <div className="bg-background rounded-lg border p-6">
                <h2 className="font-semibold text-lg mb-4">Thông tin liên hệ</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0912 345 678"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-background rounded-lg border p-6">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Địa chỉ giao hàng
                </h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shippingName">Họ và tên</Label>
                      <Input
                        id="shippingName"
                        placeholder="Nguyễn Văn A"
                        {...register('shippingName')}
                      />
                      {errors.shippingName && (
                        <p className="text-sm text-destructive">{errors.shippingName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shippingPhone">Số điện thoại</Label>
                      <Input
                        id="shippingPhone"
                        type="tel"
                        placeholder="0912 345 678"
                        {...register('shippingPhone')}
                      />
                      {errors.shippingPhone && (
                        <p className="text-sm text-destructive">{errors.shippingPhone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress">Địa chỉ</Label>
                    <Input
                      id="shippingAddress"
                      placeholder="123 Đường ABC, Phường XYZ"
                      {...register('shippingAddress')}
                    />
                    {errors.shippingAddress && (
                      <p className="text-sm text-destructive">{errors.shippingAddress.message}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shippingCity">Tỉnh/Thành phố</Label>
                      <select
                        id="shippingCity"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...register('shippingCity')}
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        <option value="hcm">TP. Hồ Chí Minh</option>
                        <option value="hn">Hà Nội</option>
                        <option value="dn">Đà Nẵng</option>
                      </select>
                      {errors.shippingCity && (
                        <p className="text-sm text-destructive">{errors.shippingCity.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shippingDistrict">Quận/Huyện</Label>
                      <select
                        id="shippingDistrict"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...register('shippingDistrict')}
                      >
                        <option value="">Chọn quận/huyện</option>
                        <option value="q1">Quận 1</option>
                        <option value="q2">Quận 2</option>
                        <option value="q3">Quận 3</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="note">Ghi chú (tùy chọn)</Label>
                    <textarea
                      id="note"
                      placeholder="Ghi chú cho đơn hàng..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...register('note')}
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-background rounded-lg border p-6">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Phương thức thanh toán
                </h2>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="COD" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Truck className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                          <p className="text-sm text-muted-foreground">Trả tiền mặt khi nhận hàng</p>
                        </div>
                      </div>
                    </Label>
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="VNPAY" id="vnpay" />
                    <Label htmlFor="vnpay" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
                          V
                        </div>
                        <div>
                          <p className="font-medium">VNPay</p>
                          <p className="text-sm text-muted-foreground">Thanh toán qua VNPay</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="STRIPE" id="stripe" />
                    <Label htmlFor="stripe" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-600 rounded text-white text-xs font-bold flex items-center justify-center">
                          S
                        </div>
                        <div>
                          <p className="font-medium">Stripe</p>
                          <p className="text-sm text-muted-foreground">Thanh toán qua Stripe</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-background rounded-lg border p-6 sticky top-24">
                <h2 className="font-semibold text-lg mb-4">Đơn hàng của bạn</h2>

                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 shrink-0">
                        <Image
                          src={item.product.images[0] || '/placeholder.png'}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">{item.product.name}</p>
                        <p className="text-sm font-medium text-primary mt-1">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        formatCurrency(shippingFee)
                      )}
                    </span>
                  </div>
                  {couponCode && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Giảm giá</span>
                      <span className="text-green-600">-{formatCurrency(discount)}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between">
                  <span className="font-semibold">Tổng cộng</span>
                  <span className="font-bold text-xl text-primary">
                    {formatCurrency(total)}
                  </span>
                </div>

                <Button type="submit" size="lg" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? 'Đang xử lý...' : `Thanh toán ${formatCurrency(total)}`}
                </Button>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <Lock className="h-3 w-3" />
                  <span>Thanh toán an toàn và bảo mật</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}
