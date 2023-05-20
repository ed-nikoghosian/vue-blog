<template>
  <ul class="breadcrumbs">
    <li v-for="item in links" :key="`${item.name}_${item.link}`">
      <router-link :to="item.link" active-class="active">{{ item.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface BreadCrumbLink {
  link: string;
  name: string;
}

export default defineComponent({
  name: 'BreadCrumbs',
  props: {
    links: {
      type: Array as PropType<BreadCrumbLink[]>,
    },
  },
});
</script>
