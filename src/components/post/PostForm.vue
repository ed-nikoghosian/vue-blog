<template>
  <form @submit.prevent="onSubmit" class="form post-form">
    <primary-input v-model="postData.title" label="Title" placeholder="Title" />
    <primary-input v-model="postData.image" label="Image URL" placeholder="https://example...." />
    <primary-textarea v-model="postData.content" label="Content" placeholder="Tell your story..." />
    <button class="btn-primary" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Post } from '@/services/types';
import PrimaryInput from '../common/PrimaryInput.vue';
import { ref } from 'vue';
import PrimaryTextarea from '../common/PrimaryTextarea.vue';

export default defineComponent({
  components: { PrimaryInput, PrimaryTextarea },
  name: 'PostForm',
  props: {
    post: {
      type: Object as PropType<Post | null>,
      required: false,
    },
  },
  setup(props, { emit }) {
    const postData = ref({
      image: props.post?.image || '',
      title: props.post?.title || '',
      content: props.post?.content || '',
    });
    const onSubmit = () => {
      emit('handleSubmit', postData.value);
    };

    return { onSubmit, postData };
  },
});
</script>

<style lang="scss">
@import '@/assets/styles/forms.scss';
</style>
