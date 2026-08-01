import type { Product, Category } from '@/types'

interface JsonLdProps {
  type: 'Product' | 'BreadcrumbList' | 'Organization' | 'WebSite'
  data: Record<string, unknown>
}

export function JsonLd({ type, data }: JsonLdProps) {
  const schemas = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ShopVN',
      url: process.env.NEXT_PUBLIC_APP_URL || 'https://shopvn.com',
      logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://shopvn.com'}/logo.png`,
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
    },
    WebSite: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ShopVN',
      url: process.env.NEXT_PUBLIC_APP_URL || 'https://shopvn.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${process.env.NEXT_PUBLIC_APP_URL || 'https://shopvn.com'}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    Product: (product: Product) => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description || '',
      image: product.images,
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://shopvn.com'}/products/${product.slug}`,
      sku: product.sku,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'VND',
        availability: product.quantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'ShopVN',
        },
      },
      aggregateRating: product.averageRating
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.averageRating,
            reviewCount: product.reviewCount,
          }
        : undefined,
    }),
    BreadcrumbList: (items: { name: string; url: string }[]) => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }),
  }

  const schema = type === 'Product'
    ? schemas.Product(data as Product)
    : schemas[type as keyof typeof schemas]?.(data as never) || schemas[type as keyof typeof schemas]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      type="Organization"
      data={{}}
    />
  )
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      type="WebSite"
      data={{}}
    />
  )
}
