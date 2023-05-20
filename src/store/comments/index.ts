import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { state } from './state';

export const commentsModule = {
  state: () => state,
  mutations: { ...mutations },
  actions: { ...actions },
  getters: { ...getters },
};
