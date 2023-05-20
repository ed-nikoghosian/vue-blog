<template>
  <header>
    <div class="container">
      <router-link to="/" class="logo">
        <img src="@/assets/images/logo.png" alt="v-blog logo" />
      </router-link>
      <div class="menu">
        <div v-if="user" class="user-menu">
          <p>{{ user.email }}</p>
          <button class="btn-simple" @click="handleLogout">Log Out</button>
        </div>
        <div v-else class="auth-buttons">
          <router-link to="/sign-in">Sign In</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters.user);

    const handleLogout = () => {
      store.dispatch('logOut');
      router.push('/');
    };

    return { user, handleLogout };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/header.scss';
</style>
