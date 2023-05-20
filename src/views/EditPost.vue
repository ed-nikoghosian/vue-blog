<template>
  <div class="container">
    <bread-crumbs :links="breadCrumbLinks" />
    <h1 class="title">Edit Post</h1>
    <post-form v-if="post" :post="post" @handleSubmit="handleSubmit" />
  </div>
</template>

<script lang="ts">
import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import PostForm from '@/components/post/PostForm.vue';
import { Post, PostData } from '@/services/types';
import { onMounted, ref } from 'vue';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'EditPost',
  components: { BreadCrumbs, PostForm },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const breadCrumbLinks = ref([{ link: '/', name: 'Blog' }]);
    const post = ref<Post | null>(null);

    onMounted(() => {
      store.dispatch('getPost', route.params.postId).then((res) => {
        post.value = res;
        breadCrumbLinks.value.push(
          { link: `/posts/${res.id}`, name: res.title },
          { link: `/posts/${res.id}/edit`, name: 'Edit' }
        );
      });
    });

    const handleSubmit = (values: PostData) => {
      store
        .dispatch('editPost', {
          postId: post.value?.id,
          data: {
            ...post.value,
            ...values,
          },
        })
        .then(() => {
          router.push('/');
        });
    };

    return { breadCrumbLinks, handleSubmit, post };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/blog.scss';
</style>
