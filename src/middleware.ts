import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting
const rateLimit = new Map<string, { count: number; lastTime: number }>()

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
             request.headers.get('x-real-ip') ||
             'anonymous'
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 60

  // Rate limit check for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const record = rateLimit.get(ip)

    if (record) {
      if (now - record.lastTime < windowMs) {
        if (record.count >= maxRequests) {
          return NextResponse.json(
            { message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.' },
            { status: 429 }
          )
        }
        record.count++
      } else {
        record.count = 1
        record.lastTime = now
      }
    } else {
      rateLimit.set(ip, { count: 1, lastTime: now })
    }
  }

  // Security headers
  const response = NextResponse.next()

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  // Clean up old entries
  if (rateLimit.size > 10000) {
    const cutoff = now - windowMs
    for (const [key, value] of rateLimit) {
      if (value.lastTime < cutoff) {
        rateLimit.delete(key)
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|icons).*)',
  ],
}
