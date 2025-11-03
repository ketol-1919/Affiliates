export type PostType = 'image' | 'video' | null;

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

// The complete Post object, including a unique ID for list rendering
export interface Post {
  id: string;
  file: File | null;
  previewUrl: string | null;
  caption: string;
  type: PostType;
  productLink: string;
  liked: boolean;
  author: User;
}

// Data for a post that is being created (before it has an ID or liked status)
export type PostData = Omit<Post, 'id' | 'liked'>;