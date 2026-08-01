'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'dien-tu', name: 'Điện tử', count: 234 },
  { id: 'thoi-trang', name: 'Thời trang', count: 189 },
  { id: 'nha-cua', name: 'Nhà cửa', count: 156 },
  { id: 'sac-dep', name: 'Sắc đẹp', count: 123 },
  { id: 'suc-khoe', name: 'Sức khỏe', count: 98 },
]

const brands = [
  { id: 'apple', name: 'Apple', count: 45 },
  { id: 'samsung', name: 'Samsung', count: 38 },
  { id: 'sony', name: 'Sony', count: 32 },
  { id: 'xiaomi', name: 'Xiaomi', count: 56 },
  { id: 'huawei', name: 'Huawei', count: 24 },
]

const priceRanges = [
  { id: 'under-500k', label: 'Dưới 500.000đ', min: 0, max: 500000 },
  { id: '500k-1m', label: '500.000đ - 1.000.000đ', min: 500000, max: 1000000 },
  { id: '1m-5m', label: '1.000.000đ - 5.000.000đ', min: 1000000, max: 5000000 },
  { id: '5m-10m', label: '5.000.000đ - 10.000.000đ', min: 5000000, max: 10000000 },
  { id: 'above-10m', label: 'Trên 10.000.000đ', min: 10000000, max: null },
]

const ratings = [
  { id: '5', label: '5 sao', stars: 5 },
  { id: '4', label: '4 sao trở lên', stars: 4 },
  { id: '3', label: '3 sao trở lên', stars: 3 },
]

interface ProductFiltersProps {
  className?: string
}

export function ProductFilters({ className }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categories')?.split(',').filter(Boolean) || []
  )
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get('brands')?.split(',').filter(Boolean) || []
  )
  const [selectedPrice, setSelectedPrice] = useState<string | null>(
    searchParams.get('price') || null
  )
  const [selectedRating, setSelectedRating] = useState<string | null>(
    searchParams.get('rating') || null
  )
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (selectedCategories.length) params.set('categories', selectedCategories.join(','))
    if (selectedBrands.length) params.set('brands', selectedBrands.join(','))
    if (selectedPrice) params.set('price', selectedPrice)
    if (selectedRating) params.set('rating', selectedRating)
    if (sortBy !== 'newest') params.set('sort', sortBy)

    router.push(`/products?${params.toString()}`)
  }

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const toggleBrand = (id: string) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedPrice(null)
    setSelectedRating(null)
  }

  const hasActiveFilters =
    selectedCategories.length ||
    selectedBrands.length ||
    selectedPrice ||
    selectedRating

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Tìm kiếm</Label>
        <div className="relative">
          <Input
            placeholder="Tên sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full px-3"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Danh mục</Label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            >
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <span className="flex-1 text-sm">{cat.name}</span>
              <span className="text-xs text-muted-foreground">({cat.count})</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Khoảng giá</Label>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.id}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            >
              <Checkbox
                checked={selectedPrice === range.id}
                onCheckedChange={() =>
                  setSelectedPrice(selectedPrice === range.id ? null : range.id)
                }
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Thương hiệu</Label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            >
              <Checkbox
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
              />
              <span className="flex-1 text-sm">{brand.name}</span>
              <span className="text-xs text-muted-foreground">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Đánh giá</Label>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label
              key={rating.id}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            >
              <Checkbox
                checked={selectedRating === rating.id}
                onCheckedChange={() =>
                  setSelectedRating(selectedRating === rating.id ? null : rating.id)
                }
              />
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={cn(
                    'text-sm',
                    i < rating.stars ? 'text-yellow-400' : 'text-gray-300'
                  )}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{rating.label.split(' ')[0]}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Xóa bộ lọc
        </Button>
      )}
    </div>
  )

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value)
          const params = new URLSearchParams(searchParams.toString())
          params.set('sort', e.target.value)
          router.push(`/products?${params.toString()}`)
        }}
        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
      >
        <option value="newest">Mới nhất</option>
        <option value="popular">Phổ biến nhất</option>
        <option value="price-asc">Giá: Thấp đến cao</option>
        <option value="price-desc">Giá: Cao đến thấp</option>
        <option value="rating">Đánh giá cao nhất</option>
      </select>

      {/* Filter button (mobile) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Bộ lọc
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                {selectedCategories.length + selectedBrands.length + (selectedPrice ? 1 : 0) + (selectedRating ? 1 : 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:max-w-[400px]">
          <SheetHeader>
            <SheetTitle>Bộ lọc</SheetTitle>
          </SheetHeader>
          <div className="mt-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Filter sidebar (desktop) */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Bộ lọc</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                Xóa
              </Button>
            )}
          </div>
          <FilterContent />
        </div>
      </div>
    </div>
  )
}
