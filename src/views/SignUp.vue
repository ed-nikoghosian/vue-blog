<template>
  <div class="auth-container">
    <h1 class="title">Sign Up</h1>
    <form class="auth-form form" @submit.prevent="handleSubmit">
      <primary-input label="name" placeholder="Your Name" v-model="values.name" required />
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
      <button type="submit" class="btn-primary">Sign Up</button>
    </form>
    <p class="helper">Allready have an account? <router-link to="/sign-in">Sign in</router-link></p>
  </div>
</template>

<script lang="ts">
import PrimaryInput from '@/components/common/PrimaryInput.vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  components: { PrimaryInput },
  name: 'SignUp',
  setup() {
    const store = useStore();
    const router = useRouter();
    const values = { name: '', email: '', password: '' };

    const handleSubmit = () => {
      store.dispatch('signUp', values).then(() => {
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
