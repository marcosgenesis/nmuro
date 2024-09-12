import { db } from '.'
import { praises } from './schema'

async function seed() {
  await db.delete(praises)

  await db.insert(praises).values([
    {
      personId: '1',
      content: 'Teste',
      createdAt: new Date(),
    },
  ])
}

seed()
