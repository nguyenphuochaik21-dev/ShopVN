'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartDrawer } from '@/components/shop/cart-drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/cart-store'
import { cn, formatCurrency } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, couponCode, discount, setCoupon } = useCartStore()

  const subtotal = getSubtotal()
  const shippingFee = subtotal >= 500000 ? 0 : 30000
  const total = subtotal - discount + shippingFee

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Giỏ hàng trống</h2>
              <p className="text-muted-foreground mb-6">
                Hãy thêm sản phẩm vào giỏ hàng của bạn
              </p>
              <Button asChild>
                <Link href="/products">Tiếp tục mua sắm</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-background rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      {items.length} sản phẩm
                    </span>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Xóa tất cả
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                      >
                        <Link href={`/products/${item.product.slug}`}>
                          <div className="relative w-24 h-24 shrink-0">
                            <Image
                              src={item.product.images[0] || '/placeholder.png'}
                              alt={item.product.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-medium line-clamp-2 hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>

                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-semibold text-primary">
                              {formatCurrency(item.product.price)}
                            </span>
                            {item.product.comparePrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatCurrency(item.product.comparePrice)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className="font-medium">
                                {formatCurrency(item.product.price * item.quantity)}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => removeItem(item.productId)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/products">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Tiếp tục mua sắm
                  </Link>
                </Button>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-background rounded-lg border p-6 sticky top-24">
                  <h2 className="font-semibold text-lg mb-4">Tóm tắt đơn hàng</h2>

                  {/* Coupon */}
                  <div className="space-y-3 mb-6">
                    <Label className="flex items-center gap-2 text-sm">
                      <Tag className="h-4 w-4" />
                      Mã giảm giá
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nhập mã..."
                        value={couponCode || ''}
                        onChange={(e) => setCoupon(e.target.value, 0)}
                        className="flex-1"
                      />
                      <Button variant="outline">Áp dụng</Button>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tạm tính</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Giảm giá</span>
                      <span className="text-green-600">
                        -{formatCurrency(discount)}
                      </span>
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
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between">
                    <span className="font-semibold">Tổng cộng</span>
                    <span className="font-bold text-xl text-primary">
                      {formatCurrency(total)}
                    </span>
                  </div>

                  {shippingFee > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Mua thêm {formatCurrency(500000 - subtotal)} để được miễn phí vận chuyển
                    </p>
                  )}

                  <Button size="lg" className="w-full mt-6" asChild>
                    <Link href="/checkout">
                      Tiến hành thanh toán
                    </Link>
                  </Button>

                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      🔒 Thanh toán an toàn với Stripe, VNPay hoặc COD
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('font-medium', className)}>
      {children}
    </div>
  )
}
