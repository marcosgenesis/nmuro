import { fastify } from 'fastify'

import { env } from '../env'

const app = fastify()

app.listen(3000).then(() => {
  console.log('Server listening on port 3000')
})
