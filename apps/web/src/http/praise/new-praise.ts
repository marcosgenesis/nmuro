import { toast } from 'sonner'

import { api } from '../api-client'

interface NewPraiseRequest {
  person: number
  content: string
}

export const newPraise = async ({ person, content }: NewPraiseRequest) => {
  try {
    const response = await api
      .post('/praise', {
        json: {
          person,
          content,
        },
      })
      .json()
    return response
  } catch (error) {
    toast.error('Erro ao enviar elogio', {
      description: 'Não foi possível enviar o elogio',
    })
    console.error(error)
  }
}
