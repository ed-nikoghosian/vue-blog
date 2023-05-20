<template>
  <div class="main">
    <app-header />
    <div class="main-content">
      <slot />
    </div>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppFooter from '../common/AppFooter.vue';
import AppHeader from '../common/AppHeader.vue';

export default defineComponent({
  components: { AppHeader, AppFooter },
  name: 'AppLayout',
});
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
