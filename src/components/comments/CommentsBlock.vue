<template>
  <div class="comments-block">
    <div v-if="comments?.length" class="comments-wrapper">
      <comment-item v-for="item in comments" :key="item.id" :comment="item" />
    </div>
    <div v-else>
      <p class="desc">No comments yet</p>
    </div>
    <add-comment-form v-if="!replyTo && user" @onSubmit="handleSubmit" />
    <div v-else class="need-auth">
      <p>You need to Sign In to add a comment</p>
      <router-link to="/sign-in">Sign in</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import CommentItem from './CommentItem.vue';
import { Comment } from '@/services/types';
import AddCommentForm from './AddCommentForm.vue';

export default defineComponent({
  components: { CommentItem, AddCommentForm },
  name: 'CommentsBlock',
  props: {
    comments: {
      type: Array as PropType<Comment[] | null>,
    },
    postId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const user = computed(() => store.getters.user);
    const replyTo = computed(() => store.getters.replyTo);

    const handleSubmit = (content: string) => {
      store.dispatch('addComment', {
        content,
        postId: props.postId,
        author: { name: user.value.name, avatar: user.value.avatar },
      });
    };

    return { replyTo, user, handleSubmit };
  },
});
</script>

<style lang="scss">
.comments-block {
  .desc {
    font-size: 16px;
    text-align: center;
    margin-bottom: 30px;
    color: #7c7c7c;
  }
  .comments-wrapper {
    width: 100%;
    margin: 12px 0;
    & > *:not(:last-child) {
      margin-bottom: 18px;
    }
  }
  .need-auth {
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    a {
      text-decoration: none;
      color: #0059be;
      &:hover {
        color: #5193de;
      }
    }
  }
}
</style>
