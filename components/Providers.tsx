'use client'

import { CartProvider } from '@/context/CartContext'
import { LoadingProvider } from '@/context/LoadingContext'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LoadingProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </LoadingProvider>
  )
}
