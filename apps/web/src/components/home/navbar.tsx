'use client'

import {
  BriefcaseBusinessIcon,
  Cuboid,
  CuboidIcon,
  HomeIcon,
} from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { useNavbar } from '@/stores/use-navbar'

import { NewPraise } from '../new-praise'
import { Button } from '../ui/button'

const links = [
  { name: 'Home', href: '/home', icon: <HomeIcon /> },
  {
    name: 'Meu Workspace  ',
    href: '/workspace',
    icon: <BriefcaseBusinessIcon />,
  },
]

export const Navbar: React.FC = () => {
  const pathname = usePathname()
  // const { tab, setTab } = useNavbar((state) => state)
  return (
    <div className="m-4 h-[95vh] w-24 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 shadow-lg">
      <Image src="/logomarca.svg" alt="Logo" width={200} height={200} />
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        <span className="my-4">
          <NewPraise />
        </span>
        {links.map((item) => (
          <Button
            className="h-16 w-16 rounded-lg"
            variant={pathname === item.href ? 'outline' : 'ghost'}
            key={item.name}
            size={'icon'}
          >
            {item.icon}
          </Button>
        ))}
      </div>
    </div>
  )
}
