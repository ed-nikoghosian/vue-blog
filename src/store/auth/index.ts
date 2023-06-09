import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { state } from './state';

export const authModule = {
  state: () => state,
  mutations: { ...mutations },
  actions: { ...actions },
  getters: { ...getters },
};
