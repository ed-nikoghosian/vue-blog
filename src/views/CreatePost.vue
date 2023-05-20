<template>
  <div class="container">
    <bread-crumbs :links="breadCrumbLinks" />
    <h1 class="title">Create Post</h1>
    <post-form @handleSubmit="handleSubmit" />
  </div>
</template>

<script lang="ts">
import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import PostForm from '@/components/post/PostForm.vue';
import { PostData } from '@/services/types';
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CreatePost',
  components: { BreadCrumbs, PostForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const breadCrumbLinks = ref([
      { link: '/', name: 'Blog' },
      { link: '/create-post', name: 'Create Post' },
    ]);

    const handleSubmit = (values: PostData) => {
      const user = store.getters.user;

      store
        .dispatch('createPost', {
          ...values,
          createdAt: new Date().toDateString(),
          author: { name: user.name },
        })
        .then(() => {
          router.push('/');
        });
    };

    return { breadCrumbLinks, handleSubmit };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/blog.scss';
</style>
