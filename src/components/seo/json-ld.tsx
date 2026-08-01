'use client'

import { useEffect } from 'react'

interface JsonLdProps {
  type: 'Product' | 'BreadcrumbList' | 'Organization' | 'WebSite'
  data: Record<string, unknown>
}

export function JsonLd({ type, data }: JsonLdProps) {
  useEffect(() => {
    let schema: Record<string, unknown> = {}

    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || 'https://shopvn.com'

    switch (type) {
      case 'Organization':
        schema = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ShopVN',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          sameAs: [
            'https://facebook.com/shopvn',
            'https://instagram.com/shopvn',
            'https://youtube.com/shopvn',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+84-1900-1234',
            contactType: 'customer service',
            availableLanguage: 'Vietnamese',
          },
        }
        break

      case 'WebSite':
        schema = {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'ShopVN',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }
        break

      case 'Product':
        const product = data as {
          name?: string
          description?: string | null
          slug?: string
          images?: string[]
          sku?: string | null
          price?: number
          quantity?: number
          averageRating?: number
          reviewCount?: number
        }
        schema = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name || '',
          description: product.description || '',
          image: product.images || [],
          url: `${baseUrl}/products/${product.slug}`,
          sku: product.sku,
          offers: {
            '@type': 'Offer',
            price: product.price || 0,
            priceCurrency: 'VND',
            availability: (product.quantity || 0) > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            seller: {
              '@type': 'Organization',
              name: 'ShopVN',
            },
          },
        }

        if (product.averageRating) {
          schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: product.averageRating,
            reviewCount: product.reviewCount || 0,
          }
        }
        break

      case 'BreadcrumbList':
        const items = (data.items || []) as { name: string; url: string }[]
        schema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }
        break
    }

    const script = document.querySelector(`script[data-json-ld="${type}"]`)
    if (script) {
      script.textContent = JSON.stringify(schema)
    }
  }, [type, data])

  return (
    <script
      type="application/ld+json"
      data-json-ld={type}
      dangerouslySetInnerHTML={{ __html: '{}' }}
    />
  )
}
