import { Comment } from '@/services/types';
import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  comments(state: State): Comment[];
  replyTo(state: State): Comment | null;
};

export const getters: GetterTree<State, State> & Getters = {
  comments(state) {
    return state.comments;
  },
  replyTo(state) {
    return state.replyTo;
  },
};
