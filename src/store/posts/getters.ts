import { Post } from '@/services/types';
import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  posts(state: State): Post[];
};

export const getters: GetterTree<State, State> & Getters = {
  posts(state) {
    return state.posts;
  },
};
