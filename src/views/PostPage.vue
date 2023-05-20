<template>
  <div v-if="post" class="post-page container">
    <div class="top">
      <bread-crumbs :links="breadCrumbLinks" />

      <div v-if="isAuth" class="buttons">
        <button class="btn-circle" @click="goToEdit"><pencil-icon /></button>
        <button class="btn-circle danger" @click="toggleShowDeletePopup"><trash-icon /></button>
      </div>
    </div>
    <div class="post-image">
      <img v-if="post.image" :src="post.image" :alt="post.title" />
      <img v-else src="@/assets/images/default_post.png" :alt="post.title" />
    </div>
    <div class="date">
      {{ new Date(post.createdAt).toLocaleDateString() }}
    </div>
    <div class="content">
      <h1 class="title">
        {{ post.title }}
      </h1>

      <p>{{ post.content }}</p>
    </div>
    <div class="comments">
      <h3 class="title">Comments</h3>
      <comments-block :postId="post.id" :comments="comments" />
    </div>

    <delete-post
      v-if="showDeletePopup"
      @onClose="toggleShowDeletePopup"
      @onSubmit="handleDeletePost"
    />
  </div>
  <div v-else class="loader-wrapper">
    <app-loader :size="64" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Comment, Post } from '@/services/types';
import AppLoader from '@/components/common/AppLoader.vue';
import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import CommentsBlock from '@/components/comments/CommentsBlock.vue';
import PencilIcon from '@/components/icons/PencilIcon.vue';
import TrashIcon from '@/components/icons/TrashIcon.vue';
import DeletePost from '@/components/post/DeletePost.vue';
import { postAPI } from '@/API/postAPI';

export default defineComponent({
  name: 'PostPage',
  components: { BreadCrumbs, AppLoader, CommentsBlock, PencilIcon, TrashIcon, DeletePost },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const breadCrumbLinks = ref([{ link: '/', name: 'Blog' }]);
    const post = ref<Post | null>(null);
    const showDeletePopup = ref(false);
    const comments = computed((): Comment[] => store.getters.comments);
    const isAuth = computed(() => store.getters.isAuth);

    onMounted(() => {
      store
        .dispatch('getPost', route.params.postId)
        .then((res) => {
          post.value = res;
          breadCrumbLinks.value.push({ link: `/posts/${res.id}`, name: res.title });
          store.dispatch('getComments', res.id);
        })
        .catch(() => {
          router.push('/');
        });
    });

    const goToEdit = () => {
      router.push(`/posts/${route.params.postId}/edit`);
    };
    const toggleShowDeletePopup = () => {
      showDeletePopup.value = !showDeletePopup.value;
    };

    const handleDeletePost = () => {
      if (post.value) {
        postAPI.deletePost(post.value.id).then(() => {
          router.push('/');
        });
      }
    };

    onUnmounted(() => {
      store.dispatch('setComments', []);
      store.dispatch('setReplyTo', null);
    });

    return {
      post,
      isAuth,
      comments,
      showDeletePopup,
      breadCrumbLinks,
      toggleShowDeletePopup,
      handleDeletePost,
      goToEdit,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/post.scss';
</style>
