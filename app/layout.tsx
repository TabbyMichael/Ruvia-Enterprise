import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ruvia Enterprise - Premium Uniforms',
  description: 'High-quality uniforms for schools, security, and sports organizations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Providers>
            <Header />
            <main className="flex-grow bg-white pt-16">{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
