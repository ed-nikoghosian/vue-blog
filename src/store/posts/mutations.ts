import { Post } from '@/services/types';
import { MutationTree } from 'vuex';
import { State } from './state';

export const mutations: MutationTree<State> & Mutations = {
  SET_POSTS(state, payload) {
    state.posts = payload;
  },
};
export enum MutationTypes {
  SET_POSTS = 'SET_POSTS',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_POSTS](state: S, payload: Post[]): void;
};
