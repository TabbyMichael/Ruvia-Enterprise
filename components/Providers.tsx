'use client'

import { CartProvider } from '@/context/CartContext'
import { LoadingProvider } from '@/context/LoadingContext'
import { AuthProvider } from '@/context/AuthContext'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LoadingProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </LoadingProvider>
    </AuthProvider>
  )
}
