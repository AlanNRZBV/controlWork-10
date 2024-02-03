export interface Post {
  id: number,
  title: string,
  content: string,
  image: string | null,
  createdAt: string
}

export type PostWithoutContent = Omit<Post, 'content'>