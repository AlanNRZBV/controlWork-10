export interface PostFromBack {
  id: number | null;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
}

export type PostWithoutContent = Omit<PostFromBack, 'content'>;

export interface CommentFromBack {
  id: number;
  author: string;
  content: string;
}

export interface UserComment {
  author: string | null;
  content: string;
}
