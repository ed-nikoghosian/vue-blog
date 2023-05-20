<template>
  <div class="primary-input-wrapper">
    <label :for="id">
      <p>{{ label }}</p>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :value="modelValue"
        @input="handleInput"
        @blur="handleBlur"
        :disabled="disabled"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrimaryInput',
  props: {
    id: { type: String, required: false },
    label: { type: String, required: false },
    type: { type: String, default: 'text' },
    placeholder: { type: String, required: false },
    modelValue: { type: String, required: true },
    required: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
  },

  setup(props, { emit }) {
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    const handleBlur = (e: FocusEvent) => {
      emit('onBlur', e);
    };

    return { handleInput, handleBlur };
  },
});
</script>
