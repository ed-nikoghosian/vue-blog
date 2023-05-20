<template>
  <div class="auth-container">
    <h1 class="title">Sign In</h1>
    <form class="auth-form form" @submit.prevent="handleSubmit">
      <primary-input
        label="email"
        type="email"
        placeholder="youremail@gmail.com"
        v-model="values.email"
        required
      />
      <primary-input
        label="password"
        type="password"
        placeholder="● ● ● ● ● ●"
        v-model="values.password"
        required
      />
      <button type="submit" class="btn-primary">Sign In</button>
    </form>
    <p class="helper">Don't have an account? <router-link to="/sign-up">Sign Up</router-link></p>
  </div>
</template>

<script lang="ts">
import PrimaryInput from '@/components/common/PrimaryInput.vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  components: { PrimaryInput },
  name: 'SignIn',
  setup() {
    const store = useStore();
    const router = useRouter();
    const values = { email: '', password: '' };

    const handleSubmit = () => {
      store.dispatch('signIn', values).then(() => {
        router.push('/');
      });
    };

    return { values, handleSubmit };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/auth.scss';
</style>
