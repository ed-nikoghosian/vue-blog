import { User, UserData } from '@/services/types';
import { ActionContext, ActionTree } from 'vuex';
import { Mutations, MutationTypes } from './mutations';
import { State } from './state';
import { authAPI } from '@/API/authAPI';

export enum ActionTypes {
  setUser = 'setUser',
  signUp = 'signUp',
  signIn = 'signIn',
  getUser = 'getUser',
  logOut = 'logOut',
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.setUser]({ commit }, payload) {
    commit(MutationTypes.SET_USER, payload);
  },
  async [ActionTypes.signUp]({ commit }, payload) {
    const userData = { ...payload, token: `${payload.email}_${payload.password}` };

    try {
      const response = await authAPI.createUser(userData);

      commit(MutationTypes.SET_USER, response);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionTypes.signIn]({ commit }, payload) {
    const token = `${payload.email}_${payload.password}`;

    try {
      const response = await authAPI.getUser(token);
      window.localStorage.setItem('token', token);

      commit(MutationTypes.SET_USER, response);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionTypes.getUser]({ commit }, payload) {
    try {
      const response = await authAPI.getUser(payload);

      if (response) {
        window.localStorage.setItem('token', response.token);

        commit(MutationTypes.SET_USER, response);
        return Promise.resolve(response);
      } else {
        return Promise.reject({ message: 'user not found' });
      }
    } catch (error) {
      window.localStorage.removeItem('token');

      return Promise.reject(error);
    }
  },
  [ActionTypes.logOut]({ commit }) {
    commit(MutationTypes.SET_USER, null);
    window.localStorage.removeItem('token');
  },
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.setUser]({ commit }: AugmentedActionContext, payload: User | null): void;
  [ActionTypes.signUp]({ commit }: AugmentedActionContext, payload: UserData): void;
  [ActionTypes.signIn]({ commit }: AugmentedActionContext, payload: Omit<UserData, 'name'>): void;
  [ActionTypes.getUser]({ commit }: AugmentedActionContext, payload: string): void;
  [ActionTypes.logOut]({ commit }: AugmentedActionContext): void;
}
