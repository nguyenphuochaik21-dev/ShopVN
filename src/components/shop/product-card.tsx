'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn, formatCurrency, calculateDiscount } from '@/lib/utils'
import type { Product, ProductSummary } from '@/types'

interface ProductCardProps {
  product: Product | ProductSummary
  className?: string
  layout?: 'grid' | 'list'
}

export function ProductCard({ product, className, layout = 'grid' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCartStore()

  const discountPercent = product.comparePrice
    ? calculateDiscount(Number(product.comparePrice), Number(product.price))
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)
    addItem(product)
    setTimeout(() => setIsAdding(false), 500)
  }

  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn('group', className)}
      >
        <Link href={`/products/${product.slug}`}>
          <div className="flex gap-4 p-4 bg-card border rounded-lg hover:shadow-lg transition-all">
            <div className="relative w-32 h-32 shrink-0">
              <Image
                src={product.images[0] || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
              {product.isFlashSale && (
                <Badge variant="destructive" className="absolute top-2 left-2">
                  Flash Sale
                </Badge>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.averageRating || 4.5}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount || 0} đánh giá)
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatCurrency(product.comparePrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    -{discountPercent}%
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {'description' in product ? product.description : ''}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button size="sm" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Thêm vào giỏ
              </Button>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={cn('group relative', className)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0] || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isFeatured && (
                <Badge className="bg-blue-500">Nổi bật</Badge>
              )}
              {product.isFlashSale && (
                <Badge variant="destructive">Flash Sale</Badge>
              )}
            </div>

            {/* Discount */}
            {discountPercent > 0 && (
              <div className="absolute top-2 right-2">
                <Badge variant="destructive" className="text-sm font-bold">
                  -{discountPercent}%
                </Badge>
              </div>
            )}

            {/* Actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = `/products/${product.slug}`
                }}
              >
                <Eye className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full"
                onClick={(e) => {
                  e.preventDefault()
                  setIsWishlisted(!isWishlisted)
                }}
              >
                <Heart
                  className={cn(
                    'h-5 w-5',
                    isWishlisted && 'fill-red-500 text-red-500'
                  )}
                />
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors min-h-[48px]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < (product.averageRating || 4)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount || 0})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.comparePrice)}
                </span>
              )}
            </div>

            {/* Sold count */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${Math.min((product.sold / 100) * 100, 100)}%`,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                Đã bán {product.sold}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to cart button */}
      <Button
        className={cn(
          'absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0',
          isAdding && 'bg-green-500'
        )}
        onClick={handleAddToCart}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {isAdding ? 'Đã thêm!' : 'Thêm vào giỏ'}
      </Button>
    </motion.div>
  )
}
