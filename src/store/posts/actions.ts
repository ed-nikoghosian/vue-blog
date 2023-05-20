import { Post, PostData, PostRequestData } from '@/services/types';
import { ActionContext, ActionTree } from 'vuex';
import { Mutations, MutationTypes } from './mutations';
import { State } from './state';
import { postAPI } from '@/API/postAPI';

export enum ActionTypes {
  setPosts = 'setPosts',
  createPost = 'createPost',
  fetchPosts = 'fetchPosts',
  getPost = 'getPost',
  editPost = 'editPost',
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.setPosts]({ commit }, payload) {
    commit(MutationTypes.SET_POSTS, payload);
  },
  async [ActionTypes.createPost](_, payload) {
    try {
      const response = await postAPI.createPost(payload);

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionTypes.fetchPosts]({ commit }) {
    try {
      const response = await postAPI.getPosts();

      commit(MutationTypes.SET_POSTS, response);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionTypes.getPost](_, postId) {
    try {
      const response = await postAPI.getPostById(postId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionTypes.editPost](_, { postId, data }) {
    try {
      const response = await postAPI.editPost(postId, data);

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.setPosts]({ commit }: AugmentedActionContext, payload: Post[]): void;
  [ActionTypes.createPost]({ commit }: AugmentedActionContext, payload: PostRequestData): void;
  [ActionTypes.getPost]({ commit }: AugmentedActionContext, payload: number): void;
  [ActionTypes.editPost](
    { commit }: AugmentedActionContext,
    payload: { postId: number; data: PostData }
  ): void;
}
