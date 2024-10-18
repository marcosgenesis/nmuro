'use client'

import { Navbar } from '@/components/home/navbar'

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Navbar />

      {children}
    </div>
  )
}
export default HomeLayout
