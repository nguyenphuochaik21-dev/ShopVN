import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartDrawer } from '@/components/shop/cart-drawer'
import { ProductFilters } from '@/components/shop/product-filters'
import { ProductCard } from '@/components/shop/product-card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sản phẩm',
  description: 'Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất',
}

// Mock data
const mockProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB - Titanium Blue',
    slug: 'iphone-15-pro-max-256gb',
    price: 32990000,
    comparePrice: 34990000,
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop'],
    sold: 1250,
    averageRating: 4.8,
    reviewCount: 2340,
    isFeatured: true,
    isFlashSale: false,
  },
  {
    id: '2',
    name: 'MacBook Air M3 13 inch 8GB RAM',
    slug: 'macbook-air-m3-13-inch',
    price: 28990000,
    comparePrice: null,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'],
    sold: 890,
    averageRating: 4.9,
    reviewCount: 1560,
    isFeatured: true,
    isFlashSale: false,
  },
  {
    id: '3',
    name: 'Tai nghe AirPods Pro 2nd Generation',
    slug: 'airpods-pro-2nd-gen',
    price: 5990000,
    comparePrice: 6990000,
    images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop'],
    sold: 2340,
    averageRating: 4.7,
    reviewCount: 4500,
    isFeatured: false,
    isFlashSale: true,
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    slug: 'samsung-galaxy-s24-ultra',
    price: 32990000,
    comparePrice: null,
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop'],
    sold: 567,
    averageRating: 4.6,
    reviewCount: 890,
    isFeatured: true,
    isFlashSale: false,
  },
  {
    id: '5',
    name: 'Apple Watch Series 9 GPS 45mm',
    slug: 'apple-watch-series-9',
    price: 11990000,
    comparePrice: null,
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop'],
    sold: 234,
    averageRating: 4.5,
    reviewCount: 456,
    isFeatured: false,
    isFlashSale: false,
  },
  {
    id: '6',
    name: 'iPad Pro 11 inch M2 Chip',
    slug: 'ipad-pro-11-m2',
    price: 22990000,
    comparePrice: null,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop'],
    sold: 123,
    averageRating: 4.8,
    reviewCount: 234,
    isFeatured: false,
    isFlashSale: false,
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5 Headphones',
    slug: 'sony-wh-1000xm5',
    price: 8990000,
    comparePrice: 9990000,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
    sold: 456,
    averageRating: 4.7,
    reviewCount: 890,
    isFeatured: true,
    isFlashSale: false,
  },
  {
    id: '8',
    name: 'Nintendo Switch OLED',
    slug: 'nintendo-switch-oled',
    price: 8990000,
    comparePrice: null,
    images: ['https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop'],
    sold: 789,
    averageRating: 4.6,
    reviewCount: 1234,
    isFeatured: false,
    isFlashSale: true,
  },
]

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <Skeleton className="aspect-square" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Tất cả sản phẩm</h1>
            <p className="text-white/80">
              Khám phá hơn 10,000 sản phẩm từ các thương hiệu uy tín
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <ProductFilters className="mb-6 lg:mb-0" />

            {/* Products */}
            <div className="flex-1">
              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Hiển thị <span className="font-medium text-foreground">1-16</span> trong{' '}
                  <span className="font-medium text-foreground">256</span> sản phẩm
                </p>
              </div>

              {/* Grid */}
              <Suspense fallback={<ProductGridSkeleton />}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </Suspense>

              {/* Pagination */}
              <div className="flex justify-center mt-12 gap-2">
                <button className="w-10 h-10 rounded-md border hover:bg-muted transition-colors disabled:opacity-50" disabled>
                  ‹
                </button>
                <button className="w-10 h-10 rounded-md border bg-primary text-primary-foreground">1</button>
                <button className="w-10 h-10 rounded-md border hover:bg-muted transition-colors">2</button>
                <button className="w-10 h-10 rounded-md border hover:bg-muted transition-colors">3</button>
                <span className="w-10 h-10 flex items-center justify-center">...</span>
                <button className="w-10 h-10 rounded-md border hover:bg-muted transition-colors">16</button>
                <button className="w-10 h-10 rounded-md border hover:bg-muted transition-colors">›</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}
