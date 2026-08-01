'use client'

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn, formatCurrency } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore()

  if (!isOpen) return null

  const subtotal = getSubtotal()

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full sm:w-[420px] bg-background shadow-xl flex flex-col animate-slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="font-semibold text-lg">Giỏ hàng</h2>
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {items.length} sản phẩm
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-2">Giỏ hàng trống</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Hãy thêm sản phẩm vào giỏ hàng của bạn
            </p>
            <Button onClick={closeCart} asChild>
              <Link href="/products">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="relative w-20 h-20 shrink-0">
                    <Image
                      src={item.product.images[0] || '/placeholder.png'}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors"
                      onClick={closeCart}
                    >
                      {item.product.name}
                    </Link>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-primary">
                        {formatCurrency(item.product.price)}
                      </span>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.productId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-4 bg-background">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Giảm giá</span>
                  <span className="font-medium text-green-600">-0đ</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Tổng cộng</span>
                  <span className="font-bold text-lg text-primary">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>

              <div className="grid gap-2">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout" onClick={closeCart}>
                    Thanh toán ngay
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/cart" onClick={closeCart}>
                    Xem giỏ hàng
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
