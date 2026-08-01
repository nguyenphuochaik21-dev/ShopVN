import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Home } from 'lucide-react'
import type { Metadata } from 'next'

import prisma from '@/lib/prisma'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/shop/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

// Force dynamic rendering - required for database queries at request time
export const dynamic = 'force-dynamic'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Generate metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({
    where: { slug },
  })

  if (!category) {
    return { title: 'Không tìm thấy danh mục' }
  }

  return {
    title: `${category.name} | ShopVN`,
    description: category.description || `Khám phá các sản phẩm ${category.name} chất lượng cao tại ShopVN`,
    openGraph: {
      title: category.name,
      description: category.description || `Khám phá các sản phẩm ${category.name}`,
      images: category.image ? [category.image] : [],
    },
  }
}

// Get products with filters
async function getCategoryProducts(
  slug: string,
  filters: {
    minPrice?: number
    maxPrice?: number
    sort?: string
    page?: number
  }
) {
  const { minPrice, maxPrice, sort = 'newest', page = 1 } = filters
  const perPage = 12

  // Build where clause
  const where: Record<string, unknown> = {
    category: { slug },
    isActive: true,
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {}
    if (minPrice !== undefined) (where.price as Record<string, number>).gte = minPrice
    if (maxPrice !== undefined) (where.price as Record<string, number>).lte = maxPrice
  }

  // Build orderBy clause
  let orderBy: Record<string, string> = { createdAt: 'desc' }
  switch (sort) {
    case 'price-asc':
      orderBy = { price: 'asc' }
      break
    case 'price-desc':
      orderBy = { price: 'desc' }
      break
    case 'popular':
      orderBy = { sold: 'desc' }
      break
    case 'rating':
      orderBy = { createdAt: 'desc' } // Simplified for now
      break
  }

  const [products, total, category] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        reviews: {
          select: { rating: true },
        },
      },
    }),
    prisma.product.count({ where }),
    prisma.category.findUnique({ where: { slug } }),
  ])

  // Calculate average rating for each product
  const productsWithRating = products.map((p) => ({
    ...p,
    averageRating: p.reviews.length
      ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
      : 0,
    reviewCount: p.reviews.length,
    reviews: undefined,
  }))

  return {
    products: productsWithRating,
    total,
    pages: Math.ceil(total / perPage),
    category,
  }
}

// Price filter options
const priceRanges = [
  { label: 'Tất cả', min: undefined, max: undefined },
  { label: 'Dưới 500K', min: 0, max: 500000 },
  { label: '500K - 1 triệu', min: 500000, max: 1000000 },
  { label: '1 - 5 triệu', min: 1000000, max: 5000000 },
  { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
  { label: 'Trên 10 triệu', min: 10000000, max: undefined },
]

// Sort options
const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'popular', label: 'Phổ biến nhất' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'rating', label: '�áng giá cao nhất' },
]

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const urlSearchParams = await searchParams

  // Parse filters from URL
  const page = Number(urlSearchParams.page) || 1
  const sort = (urlSearchParams.sort as string) || 'newest'
  const priceParam = urlSearchParams.price as string

  let minPrice: number | undefined
  let maxPrice: number | undefined
  if (priceParam) {
    const range = priceRanges.find((r) => r.label.toLowerCase().replace(/\s+/g, '-') === priceParam)
    if (range) {
      minPrice = range.min
      maxPrice = range.max
    }
  }

  const { products, total, pages, category } = await getCategoryProducts(slug, {
    minPrice,
    maxPrice,
    sort,
    page,
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center hover:text-primary">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{category.name}</span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {category.image && (
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                {category.description && (
                  <p className="text-muted-foreground max-w-2xl">{category.description}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  Có {total} sản phẩm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="border rounded-lg p-4 sticky top-24">
                <h3 className="font-semibold mb-4">Bộ lọc</h3>

                {/* Sort */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Sắp xếp theo</h4>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <Link
                        key={option.value}
                        href={`/category/${slug}?sort=${option.value}`}
                        className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                          sort === option.value
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {option.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Khoảng giá</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => {
                      const priceKey = range.label.toLowerCase().replace(/\s+/g, '-')
                      return (
                        <Link
                          key={priceKey}
                          href={`/category/${slug}?sort=${sort}&price=${priceKey}`}
                          className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                            priceParam === priceKey
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          {range.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Active filters bar */}
              {(sort !== 'newest' || priceParam) && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground">Đang lọc:</span>
                  {sort !== 'newest' && (
                    <Badge variant="secondary" className="gap-1">
                      {sortOptions.find((o) => o.value === sort)?.label}
                      <Link href={`/category/${slug}${priceParam ? `?price=${priceParam}` : ''}`}>
                        ×
                      </Link>
                    </Badge>
                  )}
                  {priceParam && (
                    <Badge variant="secondary" className="gap-1">
                      {priceRanges.find((r) => r.label.toLowerCase().replace(/\s+/g, '-') === priceParam)?.label}
                      <Link href={`/category/${slug}${sort !== 'newest' ? `?sort=${sort}` : ''}`}>
                        ×
                      </Link>
                    </Badge>
                  )}
                </div>
              )}

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Không tìm thấy sản phẩm nào trong danh mục này.
                  </p>
                  <Link href="/products">
                    <Button>Xem tất cả sản phẩm</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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

                  {/* Pagination */}
                  {pages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                      {page > 1 && (
                        <Link href={`/category/${slug}?page=${page - 1}&sort=${sort}${priceParam ? `&price=${priceParam}` : ''}`}>
                          <Button variant="outline">Trang trước</Button>
                        </Link>
                      )}
                      <span className="flex items-center px-4">
                        Trang {page} / {pages}
                      </span>
                      {page < pages && (
                        <Link href={`/category/${slug}?page=${page + 1}&sort=${sort}${priceParam ? `&price=${priceParam}` : ''}`}>
                          <Button variant="outline">Trang sau</Button>
                        </Link>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
