import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Heart, ChevronRight, ShoppingCart, Trash2 } from 'lucide-react'
import type { Metadata } from 'next'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/shop/product-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Danh sách yêu thích | ShopVN',
  description: 'Quản lý sản phẩm yêu thích của bạn',
}

async function getWishlists(userId: string) {
  const wishlists = await prisma.wishlist.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          reviews: {
            select: { rating: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return wishlists.map((w) => ({
    ...w.product,
    averageRating: w.product.reviews.length
      ? w.product.reviews.reduce((sum, r) => sum + r.rating, 0) / w.product.reviews.length
      : 0,
    reviewCount: w.product.reviews.length,
    reviews: undefined,
  }))
}

export default async function WishlistPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/wishlist')
  }

  const products = await getWishlists(session.user.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Danh sách yêu thích</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Danh sách yêu thích</h1>
            <span className="text-muted-foreground">
              {products.length} sản phẩm
            </span>
          </div>

          {products.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h2 className="text-xl font-semibold mb-2">Chưa có sản phẩm yêu thích</h2>
                  <p className="text-muted-foreground mb-6">
                    Hãy thêm những sản phẩm bạn thích vào danh sách yêu thích
                  </p>
                  <Link href="/products">
                    <Button>Khám phá sản phẩm</Button>
                  </Link>
                </div>
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
                    comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
                    images: product.images || [],
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
