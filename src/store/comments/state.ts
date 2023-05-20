import { Comment } from '@/services/types';

export const state: {
  comments: Comment[];
  replyTo: Comment | null;
} = {
  comments: [],
  replyTo: null,
};

export type State = typeof state;
