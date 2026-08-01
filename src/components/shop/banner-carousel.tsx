'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=600&fit=crop',
    title: 'Khuyến mãi mùa hè',
    subtitle: 'Giảm đến 50% cho tất cả sản phẩm',
    cta: 'Mua ngay',
    link: '/promotions/summer-sale',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=600&fit=crop',
    title: 'Công nghệ mới',
    subtitle: 'Khám phá các sản phẩm công nghệ hot nhất',
    cta: 'Xem ngay',
    link: '/category/dien-tu',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=600&fit=crop',
    title: 'Thời trang nam',
    subtitle: 'Phong cách mới cho mùa hè 2024',
    cta: 'Khám phá',
    link: '/category/thoi-trang-nam',
  },
]

export function BannerCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, next])

  return (
    <div
      className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            index === current ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-slide-in-from-bottom">
                  {banner.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-6">
                  {banner.subtitle}
                </p>
                <Link href={banner.link}>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90">
                    {banner.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100"
        onClick={prev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100"
        onClick={next}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              index === current
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            )}
          />
        ))}
      </div>
    </div>
  )
}
