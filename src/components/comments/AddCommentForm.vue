<template>
  <form ref="commentForm" class="add-comment-form" @submit.prevent="onSubmit">
    <primary-textarea v-model="comment" placeholder="Comment" :rows="3" :autofocus="autofocus" />
    <div class="button-wrapper">
      <button class="btn-primary" type="submit">Submit</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import PrimaryTextarea from '../common/PrimaryTextarea.vue';

export default defineComponent({
  components: { PrimaryTextarea },
  name: 'AddCommentForm',
  props: {
    autofocus: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, { emit }) {
    const comment = ref('');

    const commentForm = ref<HTMLFormElement | null>(null);

    onMounted(() => {
      if (props.autofocus && commentForm.value) {
        commentForm.value.scrollIntoView({ block: 'center' });
      }
    });

    const onSubmit = () => {
      emit('onSubmit', comment.value);
      comment.value = '';
    };

    return { comment, commentForm, onSubmit };
  },
});
</script>
