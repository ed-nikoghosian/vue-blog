import { User } from '@/services/types';

export const state: {
  user: User | null;
} = {
  user: null,
};

export type State = typeof state;
