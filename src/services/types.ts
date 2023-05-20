export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface User extends Omit<UserData, 'password'> {
  avatar?: string | null;
  token: string;
}

export interface PostData {
  title: string;
  image: string | null;
  content: string;
}

export type Author = {
  name: string;
  avatar?: string | null;
};

export interface PostRequestData extends PostData {
  createdAt: string;
  author: Author;
}

export interface Post extends PostRequestData {
  id: number;
}

export interface Response<D> {
  data: D;
  error?: {
    message: string;
  };
}

export interface CommentData {
  postId: number;
  author: Author;
  content: string;
}

export interface Comment extends CommentData {
  id: number | string;
  createdAt: string;
  parent: null | number;
}
