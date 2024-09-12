import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '../api-client'

interface NewPraiseRequest {
  person: number
  content: string
}

export const useNewPraise = () => {
  return useMutation({
    mutationKey: ['new-praise'],
    mutationFn: async ({ person, content }: NewPraiseRequest) => {
      const response = await api
        .post('/praise', {
          json: {
            person,
            content,
          },
        })
        .json()
      return response
    },
    onSuccess: () => {
      toast.success('Elogio enviado com sucesso', {
        description: 'O elogio foi enviado com sucesso',
      })
    },
    onError: () => {
      toast.error('Erro ao enviar elogio', {
        description: 'Não foi possível enviar o elogio',
      })
    },
  })
}
