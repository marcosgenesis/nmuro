import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Navbar } from '@/components/home/navbar'
import { ReactQueryClientProvider } from '@/components/react-query-client-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nmuro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <div vaul-drawer-wrapper="" className="bg-background">
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </div>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
