<template>
  <div class="comment-wrapper">
    <div class="comment-item">
      <div class="top">
        <user-block :user="comment.author" />
        <p class="date">
          {{ new Date(comment.createdAt).toLocaleDateString() }}
        </p>
      </div>
      <p class="content">
        {{ comment.content }}
      </p>
      <div class="buttons">
        <button v-if="user" class="btn-simple" @click="handleReply">Reply</button>
        <button class="btn-simple" @click="handleShowReplies">Show Replies</button>
      </div>
    </div>

    <div v-if="replies?.length && showReplies" class="replies">
      <comment-item v-for="reply in replies" :key="reply.id" :comment="reply" />
    </div>
    <div v-if="replyTo?.id === comment.id" class="reply-container">
      <div class="reply-to">
        <span>
          <b>Reply To:</b>
          {{ replyTo.author.name }}
        </span>
        <button @click="handleCancel" class="btn-simple">Cancel</button>
      </div>
      <add-comment-form @onSubmit="handleSubmit" autofocus />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';
import { Comment } from '@/services/types';
import UserBlock from '@/components/common/UserBlock.vue';
import { commentAPI } from '@/API/commentAPI';
import AddCommentForm from './AddCommentForm.vue';

export default defineComponent({
  components: { UserBlock, AddCommentForm },
  name: 'CommentItem',
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const showReplies = ref(false);
    const replies = ref<Comment[] | null>(null);
    const replyTo = computed(() => store.getters.replyTo);
    const user = computed(() => store.getters.user);

    const getReplies = () => {
      commentAPI.getComments(props.comment.postId, props.comment.id).then((res) => {
        if (res.length) {
          replies.value = res;
        }
      });
    };

    const handleShowReplies = () => {
      if (!showReplies.value) {
        showReplies.value = true;
        getReplies();
      }
    };

    const handleReply = () => {
      showReplies.value = true;
      store.dispatch('setReplyTo', props.comment);
      getReplies();
    };

    const handleSubmit = (content: string) => {
      store
        .dispatch('replyToComment', {
          commentId: replyTo.value.id,
          data: {
            content,
            author: { name: user.value.name, avatar: user.value.avatar },
            postId: replyTo.value.postId,
          },
        })
        .then((res) => {
          replies.value = [...(replies.value || []), res];

          console.log(replies.value?.length);
          console.log(showReplies.value);
        });
      store.dispatch('setReplyTo', null);
    };

    const handleCancel = () => {
      store.dispatch('setReplyTo', null);
    };

    return {
      user,
      replies,
      replyTo,
      showReplies,
      handleShowReplies,
      handleSubmit,
      handleCancel,
      handleReply,
    };
  },
});
</script>

<style lang="scss">
@import '@/assets/styles/comments.scss';
</style>
