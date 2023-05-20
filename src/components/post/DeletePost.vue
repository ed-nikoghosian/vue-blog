<template>
  <div class="popup">
    <div class="bg" @click="() => $emit('onClose')"></div>
    <div class="popup-content">
      <h4>Are You sure, You want to delete this post?</h4>
      <div class="buttons">
        <button class="btn-primary ghost" @click="() => $emit('onClose')">Cancel</button>
        <button class="btn-primary" @click="() => $emit('onSubmit')">Yes</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeletePost',
});
</script>
