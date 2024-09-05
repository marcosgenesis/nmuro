'use client'

import { AwardIcon, BrickWall, NewspaperIcon } from 'lucide-react'
import React from 'react'

import { Tab, useNavbar } from '@/stores/use-navbar'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

export const Navbar: React.FC = () => {
  const { tab, setTab } = useNavbar((state) => state)
  return (
    <div className="relative">
      <div className="mb-4 flex h-40 items-center justify-between bg-zinc-900 p-4">
        <Avatar className="h-24 w-24">
          <AvatarImage />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-medium">Bem vindo de volta, usuário!</p>
          <p className="flex items-center justify-end text-end text-sm text-zinc-400">
            Você tem
            <Badge className="mx-2" variant={'default'}>
              <AwardIcon className="mr-1" size={16} />
              10
            </Badge>
            novos elogios
          </p>
        </div>
      </div>
      <div className="absolute -bottom-5 flex w-full items-center justify-center gap-2 px-4">
        <Button className="w-full">Elogiar</Button>
        <Tabs value={tab} onValueChange={(v: string) => setTab(v as Tab)}>
          <TabsList>
            <TabsTrigger value="home">
              <BrickWall className="mr-2" />
              Meu mural
            </TabsTrigger>
            <TabsTrigger value="config">
              <NewspaperIcon className="mr-2" />
              Feed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
