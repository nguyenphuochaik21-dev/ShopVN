'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'
import { ProductCard } from './product-card'
import type { Product } from '@/types'

interface ProductSliderProps {
  title: string
  products: Product[]
  link?: string
  linkText?: string
}

export function ProductSlider({ title, products, link, linkText }: ProductSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false })
  const autoplayRef = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))

  const canScrollPrev = emblaApi ? emblaApi.canScrollPrev() : false
  const canScrollNext = emblaApi ? emblaApi.canScrollNext() : false

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev()
  }

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext()
  }

  return (
    <div className="relative group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          {link && (
            <Link
              href={link}
              className="text-sm text-primary hover:underline hidden sm:block"
            >
              {linkText || 'Xem tất cả'}
            </Link>
          )}
          <div className="hidden md:flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile link */}
      {link && (
        <div className="mt-4 text-center sm:hidden">
          <Link href={link} className="text-sm text-primary hover:underline">
            {linkText || 'Xem tất cả'}
          </Link>
        </div>
      )}
    </div>
  )
}
