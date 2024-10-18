'use client'
import { DndContext, useDraggable } from '@dnd-kit/core'
import { DragEndEvent } from '@dnd-kit/core/dist/types'
import parse from 'html-react-parser'
import React from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Post, usePostsStore } from '@/stores/use-posts'

const Home: React.FC = () => {
  const { posts, setPosts } = usePostsStore((state) => state)
  return <Canvas cards={posts} setCards={setPosts} />
}

const Canvas = ({
  cards,
  setCards,
}: {
  cards: Post[]
  setCards: (cards: Post[]) => void
}) => {
  const updateDraggedCardPosition = ({ delta, active }: DragEndEvent) => {
    if (!delta.x && !delta.y) return

    setCards(
      cards.map((card) => {
        if (card.id === active.id) {
          return {
            ...card,
            coordinates: {
              x: card.coordinates.x + delta.x,
              y: card.coordinates.y + delta.y,
            },
          }
        }
        return card
      }),
    )
  }

  return (
    <div
      className="canvas"
      style={{
        position: 'relative',
        height: '300px',
      }}
    >
      <DndContext onDragEnd={updateDraggedCardPosition}>
        {cards.map((card) => (
          <Draggable card={card} key={card.id} />
        ))}
      </DndContext>
    </div>
  )
}

export const Draggable = ({ card }: { card: Post }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  })

  return (
    <Card
      className="card"
      style={{
        // position card on canvas
        position: 'absolute',
        top: `${card.coordinates.y}px`,
        left: `${card.coordinates.x}px`,
        // temporary change to this position when dragging
        ...(transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px)`,
            }
          : {}),
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <CardHeader className="flex flex-row items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{card.author[0] ?? 'U'}</AvatarFallback>
        </Avatar>
        <p className="truncate">{card.author}</p>
      </CardHeader>
      <CardContent>{parse(card.content)}</CardContent>
    </Card>
  )
}
export default Home
