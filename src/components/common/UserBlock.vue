<template>
  <div class="user-block">
    <div class="avatar">
      <img v-if="user.avatar" src="" alt="" />

      <img v-else class="default" src="@/assets/images/default_avatar.svg" alt="" />
    </div>
    <div class="name">
      <h5>{{ user.name }}</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Author } from '@/services/types';

export default defineComponent({
  name: 'UserBlock',
  props: {
    user: {
      type: Object as PropType<Author>,
      required: true,
    },
  },
});
</script>
