import { CommentData, Comment } from '@/services/types';
import { ActionContext, ActionTree } from 'vuex';
import { Mutations, MutationTypes } from './mutations';
import { State } from './state';
import { commentAPI } from '@/API/commentAPI';

export enum ActionTypes {
  setComments = 'setComments',
  addComment = 'addComment',
  getComments = 'getComments',
  replyToComment = 'replyToComment',
  setReplyTo = 'setReplyTo',
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.setComments]({ commit }, payload) {
    commit(MutationTypes.SET_COMMENTS, payload);
  },
  async [ActionTypes.addComment]({ commit, state }, payload) {
    try {
      const response = await commentAPI.addComment(payload);
      const comments = state.comments;

      commit(MutationTypes.SET_COMMENTS, [...comments, response]);

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionTypes.getComments]({ commit }, postId) {
    try {
      const response = await commentAPI.getComments(postId);

      commit(MutationTypes.SET_COMMENTS, response);

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionTypes.replyToComment]({ commit }, { commentId, data }) {
    try {
      const response = await commentAPI.addComment(data, commentId);
      //todo
      // commit(MutationTypes.SET_COMMENTS, [response]);

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  [ActionTypes.setReplyTo]({ commit }, payload) {
    commit(MutationTypes.SET_REPLY_TO, payload);
  },
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.setComments]({ commit }: AugmentedActionContext, payload: Comment[]): void;
  [ActionTypes.addComment]({ commit }: AugmentedActionContext, payload: CommentData): void;
  [ActionTypes.replyToComment](
    { commit }: AugmentedActionContext,
    payload: { commentId: number; data: CommentData }
  ): void;
  [ActionTypes.setReplyTo]({ commit }: AugmentedActionContext, payload: Comment | null): void;
}
