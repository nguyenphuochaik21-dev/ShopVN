'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search as SearchIcon, X, ChevronRight, Filter, Loader2 } from 'lucide-react'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/shop/product-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Product } from '@/types'

function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  // Search when query changes
  useEffect(() => {
    if (query) {
      performSearch(query)
    } else {
      setResults([])
      setTotal(0)
    }
  }, [query])

  const performSearch = async (q: string) => {
    if (!q.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`/api/products?q=${encodeURIComponent(q)}&limit=20`)
      if (res.ok) {
        const data = await res.json()
        setResults(data.products || [])
        setTotal(data.total || 0)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const recentSearches = [
    'iPhone 15',
    'Samsung Galaxy',
    'MacBook Air',
    'AirPods Pro',
  ]

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12 h-12 text-base"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-12 top-0 h-full"
                onClick={() => {
                  setSearchQuery('')
                  router.push('/search')
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              type="submit"
              size="icon"
              className="absolute right-0 top-0 h-full px-4"
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="aspect-square" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : query ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Kết quả tìm kiếm cho "{query}": <strong>{total} sản phẩm</strong>
              </p>
            </div>

            {results.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <SearchIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h2 className="text-xl font-semibold mb-2">Không tìm thấy kết quả</h2>
                    <p className="text-muted-foreground mb-6">
                      Không có sản phẩm nào phù hợp với "{query}"
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="text-sm text-muted-foreground">Gợi ý:</span>
                      {recentSearches.map((term) => (
                        <Link key={term} href={`/search?q=${encodeURIComponent(term)}`}>
                          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                            {term}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      price: typeof product.price === 'string' ? Number(product.price) : product.price,
                      comparePrice: product.comparePrice
                        ? typeof product.comparePrice === 'string'
                          ? Number(product.comparePrice)
                          : product.comparePrice
                        : null,
                      images: product.images || [],
                    }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* No search query - show suggestions */
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="py-8">
                <h2 className="text-lg font-semibold mb-4">Tìm kiếm phổ biến</h2>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <Link key={term} href={`/search?q=${encodeURIComponent(term)}`}>
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1"
                      >
                        {term}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  )
}
