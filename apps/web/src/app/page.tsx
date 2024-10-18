'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const newWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30)
    .trim()
    .regex(/^[a-zA-Z0-9]+$/),
})

export default function Home() {
  const router = useRouter()
  const newWorkspaceMethods = useForm({
    resolver: zodResolver(newWorkspaceSchema),
  })

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        variants={{
          hidden: { y: 100, opacity: 0 },
          show: { y: 0, opacity: 1 },
        }}
        transition={{ duration: 0.7 }}
        initial="hidden"
        animate="show"
      >
        <Card className="max-w-[400px]">
          <CardHeader>
            <CardTitle>Bem vindo ao nmuro!</CardTitle>
            <CardDescription>
              Para iniciar, vamos criar seu workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-md border px-4 py-2">
              <Avatar className="h-10 w-10">
                <AvatarImage />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span>
                <p className="font-medium">Nome do usuário</p>
                <p className="text-sm text-gray-400">email@email.com</p>
              </span>
            </div>
            <div>
              <Form {...newWorkspaceMethods}>
                <form action="">
                  <FormField
                    name="name"
                    control={newWorkspaceMethods.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Nome do workspace</FormLabel>
                          <Input {...field} />
                        </FormItem>
                      )
                    }}
                  />
                </form>
              </Form>
            </div>
            <span className="flex items-center gap-2">
              <Checkbox id="use-domain" />
              <span>
                <label htmlFor="use-domain">
                  Permitir entrada automática de membros
                </label>
                <p className="text-xs text-gray-400">
                  Todos usuários com o domínio nmuro.com entrarão
                  automaticamente no workspace
                </p>
              </span>
            </span>
            <CardFooter>
              <Button className="w-full" onClick={() => router.push('/home')}>
                Criar workspace
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
