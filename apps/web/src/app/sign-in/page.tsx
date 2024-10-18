'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function SignIn() {
  const [viewPassword, setViewPassword] = React.useState(false)
  const formMethods = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  })

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-[70vw] flex-col gap-8">
        <Image src="/nmuro-logo.svg" alt="Logo" width={200} height={200} />
        <span>
          <p className="mb-4 font-medium">Sign In</p>
          <Form {...formMethods}>
            <form action="" className="flex flex-col gap-4">
              <FormField
                control={formMethods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <span className="flex items-center gap-2">
                      <Input
                        {...field}
                        type={viewPassword ? 'text' : 'password'}
                      />
                      <Button
                        type="button"
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => setViewPassword((old) => !old)}
                      >
                        {viewPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </Button>
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
        </span>
      </div>
    </div>
  )
}
