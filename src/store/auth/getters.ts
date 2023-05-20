import { User } from '@/services/types';
import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  user(state: State): User | null;
  isAuth(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  user(state) {
    return state.user;
  },
  isAuth(state) {
    return !!state.user;
  },
};
