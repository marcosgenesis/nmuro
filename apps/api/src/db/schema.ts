import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const praises = pgTable('praises', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  personId: text('person_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
})
