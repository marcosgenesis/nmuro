'use client'
import './globals.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Navbar } from '@/components/home/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nmuro',
}
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <div vaul-drawer-wrapper="" className="bg-background">
            <Navbar />
            <main>{children}</main>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  )
}
