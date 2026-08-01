import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format, parseISO } from 'date-fns'
import { vi, enUS } from 'date-fns/locale'
import { cubicBezier } from 'framer-motion'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string, locale = 'vi-VN', currency = 'VND') {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

export function formatDate(date: Date | string, formatStr = 'dd/MM/yyyy') {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, formatStr, { locale: vi })
}

export function formatRelativeTime(date: Date | string) {
  const d = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true, locale: vi })
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export function getImageUrl(image: string | null | undefined, fallback = '/placeholder.png') {
  if (!image) return fallback
  if (image.startsWith('http')) return image
  return image
}

export function calculateDiscount(original: number, current: number) {
  if (original <= 0) return 0
  return Math.round(((original - current) / original) * 100)
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
) {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
) {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePhone(phone: string) {
  const re = /^(0[0-9]{9,10})$/
  return re.test(phone)
}

export function maskEmail(email: string) {
  const [username, domain] = email.split('@')
  const maskedUsername = username.slice(0, 2) + '***'
  return `${maskedUsername}@${domain}`
}

export function maskPhone(phone: string) {
  if (phone.length < 10) return phone
  return phone.slice(0, 3) + '****' + phone.slice(-3)
}

export const ease = {
  easeOut: cubicBezier(0.16, 1, 0.3, 1),
  easeInOut: cubicBezier(0.65, 0, 0.35, 1),
  spring: cubicBezier(0.34, 1.56, 0.64, 1),
}

export const ORDER_STATUS_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'Clock' },
  CONFIRMED: { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'CheckCircle' },
  PROCESSING: { bg: 'bg-purple-100', text: 'text-purple-800', icon: 'Package' },
  SHIPPING: { bg: 'bg-orange-100', text: 'text-orange-800', icon: 'Truck' },
  DELIVERED: { bg: 'bg-green-100', text: 'text-green-800', icon: 'CheckCircle2' },
  CANCELLED: { bg: 'bg-red-100', text: 'text-red-800', icon: 'XCircle' },
  REFUNDED: { bg: 'bg-gray-100', text: 'text-gray-800', icon: 'RotateCcw' },
}

export const PAYMENT_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  PAID: { bg: 'bg-green-100', text: 'text-green-800' },
  FAILED: { bg: 'bg-red-100', text: 'text-red-800' },
  REFUNDED: { bg: 'bg-gray-100', text: 'text-gray-800' },
}
