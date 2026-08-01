'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

let toastContext: ToastContextValue | null = null

export function toast(props: Omit<Toast, 'id'>) {
  if (toastContext) {
    toastContext.addToast(props)
  }
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    toastContext = {
      toasts,
      addToast: (t) => {
        const id = Math.random().toString(36).substring(7)
        setToasts((prev) => [...prev, { ...t, id }])
        setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== id))
        }, t.duration || 4000)
      },
      removeToast: (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      },
    }
    return () => {
      toastContext = null
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'animate-slide-in-from-right rounded-lg border bg-background p-4 shadow-lg flex items-start gap-3',
            t.variant === 'success' && 'border-green-500 bg-green-50 dark:bg-green-950',
            t.variant === 'error' && 'border-red-500 bg-red-50 dark:bg-red-950',
            t.variant === 'warning' && 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950'
          )}
        >
          <div className="flex-1">
            {t.title && <p className="font-medium text-sm">{t.title}</p>}
            {t.description && (
              <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
            )}
          </div>
          <button
            onClick={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
