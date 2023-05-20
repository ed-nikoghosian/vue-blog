<template>
  <app-layout v-if="isReady">
    <router-view />
  </app-layout>
  <app-loading-screen v-else />
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import AppLayout from './components/layouts/AppLayout.vue';
import AppLoadingScreen from './components/common/AppLoadingScreen.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  components: { AppLayout, AppLoadingScreen },
  name: 'App',
  setup() {
    const router = useRouter();
    const store = useStore();
    const isReady = ref(false);

    onMounted(() => {
      const token = window.localStorage.getItem('token');
      if (token) {
        store
          .dispatch('getUser', token)
          .catch(() => {
            window.localStorage.removeItem('token');
            router.push('/');
          })
          .finally(() => {
            isReady.value = true;
          });
      } else {
        isReady.value = true;
      }
    });

    return { isReady };
  },
};
</script>
