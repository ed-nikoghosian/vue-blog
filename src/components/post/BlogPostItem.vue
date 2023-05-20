<template>
  <div class="card-item">
    <div class="image">
      <img v-if="image" :src="image" :alt="title" />
      <img v-else src="@/assets/images/default_post.png" :alt="title" />
    </div>
    <div class="content">
      <h3 class="title">
        {{ title }}
      </h3>
      <p class="text">
        {{ content }}
      </p>
      <p class="date">
        {{ date }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BlogPostItem',
  props: {
    image: {
      type: null as unknown as PropType<string | null>,
      default: null,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    date: {
      type: String,
    },
  },
});
</script>
