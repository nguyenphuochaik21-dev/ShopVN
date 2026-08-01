'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface BannerProps {
  title: string
  subtitle: string
  image: string
  link: string
  cta: string
  className?: string
  reverse?: boolean
}

export function Banner({
  title,
  subtitle,
  image,
  link,
  cta,
  className,
  reverse = false,
}: BannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative h-[300px] md:h-[400px] rounded-xl overflow-hidden ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

      <div className={`absolute inset-0 flex items-center ${reverse ? 'justify-end' : 'justify-start'}`}>
        <div className={`container mx-auto px-4 ${reverse ? 'text-right' : ''}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-md">
            {subtitle}
          </p>
          <Link href={link}>
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              {cta}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
