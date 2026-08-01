import Link from 'next/link'
import { FlashlightIcon, Clock, TrendingDown, Zap } from 'lucide-react'
import type { Metadata } from 'next'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/shop/product-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import prisma from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Flash Sale | ShopVN',
  description: 'Khuyến mãi Flash Sale - Giá sốc chỉ trong thời gian giới hạn',
}

async function getFlashSaleProducts() {
  const products = await prisma.product.findMany({
    where: {
      isFlashSale: true,
      isActive: true,
    },
    include: {
      reviews: {
        select: { rating: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  })

  return products.map((p) => ({
    ...p,
    averageRating: p.reviews.length
      ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
      : 0,
    reviewCount: p.reviews.length,
    reviews: undefined,
  }))
}

async function getCategories() {
  return prisma.category.findMany({
    take: 8,
  })
}

export default async function FlashSalePage() {
  const [products, categories] = await Promise.all([
    getFlashSaleProducts(),
    getCategories(),
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Zap className="h-8 w-8" />
                  <h1 className="text-4xl font-bold">FLASH SALE</h1>
                </div>
                <p className="text-xl opacity-90 mb-4">
                  Giá sốc chỉ hôm nay! Giảm đến 70%
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Kết thúc sau: 23:59:59</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-center bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-3xl font-bold">23</div>
                  <div className="text-xs">Giờ</div>
                </div>
                <div className="text-center bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-3xl font-bold">59</div>
                  <div className="text-xs">Phút</div>
                </div>
                <div className="text-center bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-3xl font-bold">59</div>
                  <div className="text-xs">Giây</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="secondary" className="bg-primary text-primary-foreground">
                Tất cả
              </Button>
              {categories.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.slug}`}>
                  <Button variant="outline">{cat.name}</Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <h2 className="text-xl font-bold">Sản phẩm Flash Sale</h2>
                <Badge variant="destructive">{products.length} sản phẩm</Badge>
              </div>
            </div>

            {products.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Zap className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h2 className="text-xl font-semibold mb-2">Chưa có sản phẩm Flash Sale</h2>
                  <p className="text-muted-foreground mb-6">
                    Hãy quay lại sau để không bỏ lỡ các deal hời!
                  </p>
                  <Link href="/products">
                    <Button>Khám phá sản phẩm</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      price: Number(product.price),
                      comparePrice: product.comparePrice
                        ? Number(product.comparePrice)
                        : null,
                      images: product.images || [],
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Banner CTA */}
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Bạn bỏ lỡ Flash Sale?</h2>
            <p className="text-muted-foreground mb-6">
              Đừng lo! Flash Sale diễn ra hàng ngày. Theo dõi chúng tôi để không bỏ lỡ
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <Button>Xem tất cả sản phẩm</Button>
              </Link>
              <Link href="/promotions">
                <Button variant="outline">Xem khuyến mãi khác</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
