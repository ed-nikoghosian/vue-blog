import { InjectionKey } from 'vue';
import { Store, useStore as baseUseStore } from 'vuex';
import { authModule } from './auth';
import { postsModule } from './posts';
import { commentsModule } from './comments';
import { State as PostsState } from './posts/state';
import { State as AuthState } from './auth/state';
import { State as CommentsState } from './comments/state';

type State = AuthState & PostsState & CommentsState;

export default new Store<State>({
  modules: {
    auth: authModule,
    posts: postsModule,
    comments: commentsModule,
  },
});

export const key: InjectionKey<Store<State>> = Symbol();

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
