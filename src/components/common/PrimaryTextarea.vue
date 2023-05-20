<template>
  <div class="primary-textarea-wrapper">
    <label :for="id">
      <p>{{ label }}</p>
      <textarea
        ref="textArea"
        :id="id"
        :rows="rows"
        :placeholder="placeholder"
        :required="required"
        :value="modelValue"
        @input="handleInput"
        :disabled="disabled"
      ></textarea>
    </label>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'PrimaryTextarea',
  props: {
    id: { type: String, required: false },
    label: { type: String, required: false },
    rows: { type: Number, default: 10 },
    placeholder: { type: String, required: false },
    modelValue: { type: String, required: true },
    required: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
  },

  setup(props, { emit }) {
    const textArea = ref<HTMLTextAreaElement | null>(null);
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    const handleBlur = (e: FocusEvent) => {
      emit('onBlur', e);
    };

    onMounted(() => {
      if (props.autofocus && textArea.value) {
        textArea.value.focus();
      }
    });

    return { handleInput, handleBlur, textArea };
  },
});
</script>
