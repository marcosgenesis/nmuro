import { create } from 'zustand'

export type Post = {
  id: string
  title: string
  content: string
  author: string
  coordinates: {
    x: number
    y: number
  }
}

interface PostsState {
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  setPosts: (posts) => set(() => ({ posts })),
}))
