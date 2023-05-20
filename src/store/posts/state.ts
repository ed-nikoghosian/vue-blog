import { Post } from '@/services/types';

export const state: {
  posts: Post[];
} = {
  posts: [],
};

export type State = typeof state;
