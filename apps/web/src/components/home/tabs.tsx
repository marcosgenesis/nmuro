import { faker } from '@faker-js/faker'
import React from 'react'

import { useNavbar } from '@/stores/use-navbar'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import { Tabs, TabsContent } from '../ui/tabs'
export const AppTabs: React.FC = () => {
  const { tab } = useNavbar((state) => state)
  return (
    <Tabs value={tab}>
      <TabsContent value={'home'}>
        <div className="px-4 py-4">
          <p className="text-xl">Elogios mais recentes</p>
          <div className="mt-4 grid grid-cols-1 gap-2">
            {[...Array(10)].map((_, i) => (
              <span
                className="relative flex flex-col items-center justify-center"
                key={i}
              >
                <div className="flex w-full items-center justify-center gap-2 rounded-t-md bg-zinc-900 px-4 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={faker.image.avatar()} />
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>
                  <p className="text-center text-sm">
                    {faker.person.fullName()}
                  </p>
                </div>
                <Card key={i} className="flex w-full rounded-t-none px-4 py-2">
                  <div className="flex w-full flex-col gap-4 px-2">
                    <span className="flex items-center justify-between gap-2">
                      <span className="flex gap-2">
                        <Badge>Recompensa</Badge>
                        <Badge>Aumento</Badge>
                      </span>
                      <p className="text-xs text-zinc-400">
                        {faker.date.past().toLocaleDateString()}
                      </p>
                    </span>
                    <p>{faker.lorem.paragraph()}</p>
                  </div>
                </Card>
              </span>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value={'config'}>Config</TabsContent>
    </Tabs>
  )
}
