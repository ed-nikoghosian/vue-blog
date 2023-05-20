import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import BlogPage from '@/views/BlogPage.vue';
import PostPage from '@/views/PostPage.vue';
import CreatePost from '@/views/CreatePost.vue';
import EditPost from '@/views/EditPost.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import store from '@/store/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'BlogPage',
    component: BlogPage,
  },
  {
    path: '/posts/:postId',
    name: 'PostPage',
    component: PostPage,
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: { requiresAuth: true },
  },
  {
    path: '/posts/:postId/edit',
    name: 'EditPost',
    component: EditPost,
    meta: { requiresAuth: true },
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta: { guest: true },
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: { guest: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next('/sign-in');
  } else if (to.matched.some((record) => record.meta.guest) && token) {
    next('/');
  } else {
    next();
  }
});

export default router;
