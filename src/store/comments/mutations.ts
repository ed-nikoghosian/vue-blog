import { Comment } from '@/services/types';
import { MutationTree } from 'vuex';
import { State } from './state';

export const mutations: MutationTree<State> & Mutations = {
  SET_COMMENTS(state, payload) {
    state.comments = payload;
  },
  SET_REPLY_TO(state, payload) {
    state.replyTo = payload;
  },
};
export enum MutationTypes {
  SET_COMMENTS = 'SET_COMMENTS',
  SET_REPLY_TO = 'SET_REPLY_TO',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_COMMENTS](state: S, payload: Comment[]): void;
  [MutationTypes.SET_REPLY_TO](state: S, payload: Comment | null): void;
};
