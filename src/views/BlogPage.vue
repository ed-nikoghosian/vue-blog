<template>
  <div class="container">
    <div class="top">
      <h1 class="title">Blog</h1>

      <button v-if="isAuth" class="btn-circle" @click="goToAddPost"><plus-icon /></button>
    </div>
    <div class="grid-container">
      <router-link v-for="item in posts" :key="item.id" :to="`/posts/${item.id}`">
        <blog-post-item
          :title="item.title"
          :image="item.image"
          :content="item.content"
          :date="new Date(item.createdAt).toLocaleDateString()"
        />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import PlusIcon from '@/components/icons/PlusIcon.vue';
import BlogPostItem from '@/components/post/BlogPostItem.vue';
import { Post } from '@/services/types';
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  components: { BlogPostItem, PlusIcon },
  name: 'BlogPage',
  setup() {
    const store = useStore();
    const router = useRouter();
    const posts = computed((): Post[] => store.getters.posts);
    const isLoading = ref(false);
    const isAuth = computed(() => store.getters.isAuth);

    onMounted(() => {
      isLoading.value = true;
      store.dispatch('fetchPosts').finally(() => {
        isLoading.value = false;
      });
    });

    const goToAddPost = () => {
      router.push('/create-post');
    };

    return {
      posts,
      isLoading,
      isAuth,
      goToAddPost,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/blog.scss';
</style>
