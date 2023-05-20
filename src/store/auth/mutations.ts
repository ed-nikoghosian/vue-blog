import { User } from '@/services/types';
import { MutationTree } from 'vuex';
import { State } from './state';

export const mutations: MutationTree<State> & Mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
};
export enum MutationTypes {
  SET_USER = 'SET_USER',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_USER](state: S, payload: User | null): void;
};
