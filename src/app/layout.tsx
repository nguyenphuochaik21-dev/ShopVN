import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
  title: {
    default: 'Cửa hàng | Mua sắm trực tuyến',
    template: '%s | Cửa hàng',
  },
  description: 'Website bán hàng cá nhân với hàng ngàn sản phẩm chất lượng, giá tốt nhất thị trường.',
  keywords: ['mua sắm', 'thương mại điện tử', 'shop online', 'bán hàng'],
  authors: [{ name: 'Cửa hàng' }],
  creator: 'Cửa hàng',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    siteName: 'Cửa hàng',
    title: 'Cửa hàng | Mua sắm trực tuyến',
    description: 'Website bán hàng cá nhân với hàng ngàn sản phẩm chất lượng',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cửa hàng',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cửa hàng | Mua sắm trực tuyến',
    description: 'Website bán hàng cá nhân với hàng ngàn sản phẩm chất lượng',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <TooltipProvider>
                {children}
                <Toaster
                  position="top-right"
                  richColors
                  closeButton
                  duration={4000}
                />
              </TooltipProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
