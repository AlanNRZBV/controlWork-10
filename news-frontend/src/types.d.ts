export interface PostFromBack {
  id: number | null,
  title: string,
  content: string,
  image: string | null,
  createdAt: string
}

export type PostWithoutContent = Omit<PostFromBack, 'content'>
