export interface News {
  title: string,
  content: string,
  image: string | null
}

export interface Comment {
  news_id: number,
  author: string | null,
  content: string,
}