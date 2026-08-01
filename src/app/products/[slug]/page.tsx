'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw, Check, ChevronRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartDrawer } from '@/components/shop/cart-drawer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn, formatCurrency, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store'

// Mock product data
const product = {
  id: '1',
  name: 'iPhone 15 Pro Max 256GB - Titanium Blue',
  slug: 'iphone-15-pro-max-256gb',
  description: 'iPhone 15 Pro Max sở hữu thiết kế cao cấp với khung titanium, màn hình Super Retina XDR 6.7 inch với công nghệ ProMotion 120Hz. Chip A17 Pro mạnh mẽ, hệ thống camera 48MP với khả năng chụp ảnh chuyên nghiệp.',
  content: `
    <h3>Tính năng nổi bật</h3>
    <ul>
      <li>Khung titanium cao cấp, nhẹ và bền</li>
      <li>Màn hình Super Retina XDR 6.7 inch</li>
      <li>Công nghệ ProMotion 120Hz</li>
      <li>Chip A17 Pro - chip di động mạnh nhất</li>
      <li>Hệ thống camera 48MP chuyên nghiệp</li>
      <li>Pin trâu, sạc nhanh 27W</li>
      <li>Hỗ trợ USB-C, USB 3</li>
    </ul>
    <h3>Trong hộp</h3>
    <ul>
      <li>iPhone 15 Pro Max</li>
      <li>Cáp sạc USB-C</li>
      <li>Sách hướng dẫn</li>
    </ul>
  `,
  price: 32990000,
  comparePrice: 34990000,
  sku: 'IPH15PM256BLUE',
  quantity: 50,
  sold: 1250,
  images: [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
  ],
  video: null,
  isFeatured: true,
  isFlashSale: false,
  category: { name: 'Điện tử', slug: 'dien-tu' },
  averageRating: 4.8,
  reviewCount: 2340,
  attributes: [
    { name: 'Dung lượng', value: '256GB' },
    { name: 'Màu sắc', value: 'Titanium Blue' },
  ],
}

const reviews = [
  {
    id: '1',
    user: { name: 'Nguyễn Văn A', avatar: null },
    rating: 5,
    title: 'Sản phẩm tuyệt vời',
    content: 'Điện thoại rất đẹp, camera chụp ảnh cực kỳ nét. Giao hàng nhanh, đóng gói cẩn thận.',
    images: [],
    isVerified: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    user: { name: 'Trần Thị B', avatar: null },
    rating: 4,
    title: 'Tốt nhưng giá cao',
    content: 'Sản phẩm tốt, nhưng giá hơi cao so với các nơi khác.',
    images: [],
    isVerified: true,
    createdAt: '2024-01-10',
  },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCartStore()

  const discountPercent = product.comparePrice
    ? calculateDiscount(Number(product.comparePrice), Number(product.price))
    : 0

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-foreground">Sản phẩm</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/category/${product.category.slug}`} className="hover:text-foreground">
              {product.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden border">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {discountPercent > 0 && (
                  <Badge variant="destructive" className="absolute top-4 left-4 text-lg px-3">
                    -{discountPercent}%
                  </Badge>
                )}
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all',
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground/30'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.isFeatured && <Badge>⭐ Nổi bật</Badge>}
                  {product.isFlashSale && <Badge variant="destructive">⚡ Flash Sale</Badge>}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-5 w-5',
                          i < Math.floor(product.averageRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.averageRating}</span>
                  <span className="text-muted-foreground">({product.reviewCount} đánh giá)</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-green-600">{product.sold} đã bán</span>
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-xl">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">
                    {formatCurrency(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatCurrency(product.comparePrice)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  SKU: {product.sku}
                </p>
              </div>

              <div className="space-y-4">
                {product.attributes.map((attr) => (
                  <div key={attr.name}>
                    <label className="text-sm font-medium mb-2 block">{attr.name}</label>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 border rounded-lg hover:border-primary transition-colors bg-primary/5 border-primary text-primary">
                        {attr.value}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Số lượng:</label>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-r-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-10 text-center border-x focus:outline-none"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.quantity} sản phẩm có sẵn
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn('flex-1', isWishlisted && 'text-red-500 border-red-500')}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={cn('h-5 w-5 mr-2', isWishlisted && 'fill-current')} />
                  {isWishlisted ? 'Đã thích' : 'Yêu thích'}
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Miễn phí vận chuyển</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Bảo hành 12 tháng</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>Đổi trả 30 ngày</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger value="description" className="rounded-t-lg data-[state=active]:bg-background">
                  Mô tả
                </TabsTrigger>
                <TabsTrigger value="specifications" className="rounded-t-lg data-[state=active]:bg-background">
                  Thông số kỹ thuật
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-t-lg data-[state=active]:bg-background">
                  Đánh giá ({product.reviewCount})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-4">Mô tả sản phẩm</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div dangerouslySetInnerHTML={{ __html: product.content }} />
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Thông số kỹ thuật</h3>
                <div className="border rounded-lg">
                  <div className="grid grid-cols-2 gap-4 p-4 border-b">
                    <span className="text-muted-foreground">Màn hình</span>
                    <span>Super Retina XDR 6.7 inch</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-4 border-b">
                    <span className="text-muted-foreground">Chip</span>
                    <span>A17 Pro</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-4 border-b">
                    <span className="text-muted-foreground">RAM</span>
                    <span>8GB</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-4 border-b">
                    <span className="text-muted-foreground">Bộ nhớ</span>
                    <span>256GB</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <span className="text-muted-foreground">Pin</span>
                    <span>4422 mAh</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Đánh giá sản phẩm</h3>
                  <Button>Viết đánh giá</Button>
                </div>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-medium">
                          {review.user.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.user.name}</span>
                            {review.isVerified && (
                              <Badge variant="success" className="text-xs">
                                <Check className="h-3 w-3 mr-1" />
                                Đã mua hàng
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-4 w-4',
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                )}
                              />
                            ))}
                          </div>
                          {review.title && (
                            <p className="font-medium mt-2">{review.title}</p>
                          )}
                          <p className="text-muted-foreground mt-1">{review.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}
