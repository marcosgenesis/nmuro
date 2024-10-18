import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Cuboid } from 'lucide-react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useNewPraise } from '@/http/praise/new-praise'
import { cn } from '@/lib/utils'
import { usePostsStore } from '@/stores/use-posts'

import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  ResponsiveModal,
  ResponsiveModalBody,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from './ui/responsive-drawer'
import RichTextEditor from './ui/text-editor'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

const newPraiseSchema = z.object({
  person: z.string({
    required_error: 'Escolha uma pessoa',
  }),
  content: z.string({
    required_error: 'Escreva o elogio',
  }),
})

const members = Array.from({ length: 100 }).map(() => ({
  id: Math.random(),
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
}))

export const NewPraise: React.FC = () => {
  // const newPraiseMutation = useNewPraise()
  const { setPosts, posts } = usePostsStore((state) => state)
  const newPraiseForm = useForm<z.infer<typeof newPraiseSchema>>({
    resolver: zodResolver(newPraiseSchema),
  })

  const handleNewPraise: SubmitHandler<
    z.infer<typeof newPraiseSchema>
  > = async ({ content, person }) => {
    setPosts([
      ...posts,
      {
        id: Math.random().toString(),
        title: 'Praise',
        content,
        author: person,
        coordinates: {
          x: 0,
          y: 0,
        },
      },
    ])
  }

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={'icon'} className="h-12 w-12">
                <Cuboid />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Novo Elogio</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Novo Elogio</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Elogie algum companheiro de trabalho
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <ResponsiveModalBody>
          <Form {...newPraiseForm}>
            <form onSubmit={newPraiseForm.handleSubmit(handleNewPraise)}>
              <FormField
                control={newPraiseForm.control}
                name="person"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Pessoa</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? members.find((language) => {
                                  return language.name === field.value
                                })?.name
                              : 'Selecione uma pessoa'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Pesquisar pessoa" />
                          <CommandList>
                            <CommandEmpty>Nenhum resultado</CommandEmpty>
                            <CommandGroup>
                              {members.map((language) => (
                                <CommandItem
                                  value={language.name}
                                  key={language.id}
                                  onSelect={() => {
                                    newPraiseForm.setValue(
                                      'person',
                                      language.name,
                                    )
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      language.name === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                  {language.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Escolha a pessoa que você gostaria de elogiar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={newPraiseForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Elogio</FormLabel>
                    <FormControl>
                      <RichTextEditor {...field} />
                    </FormControl>
                    <FormDescription>
                      Escreva o elogio que você gostaria de expressar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ResponsiveModalFooter>
                <Button className="w-full">Publicar</Button>
              </ResponsiveModalFooter>
            </form>
          </Form>
        </ResponsiveModalBody>
      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}
