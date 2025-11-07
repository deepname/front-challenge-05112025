<template>
  <input
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    class="base-input"
    :class="`base-input--${size}`"
  />
</template>

<script setup lang="ts">
const model = defineModel<string>();

withDefaults(
  defineProps<{
    type?: string;
    size?: 'sm' | 'md' | 'lg';
    placeholder?: string;
  }>(),
  {
    type: 'text',
    size: 'md',
    placeholder: '',
  }
);
</script>

<style scoped lang="scss">
@use '~/assets/variables';
@use '~/assets/utils';

.base-input {
  width: 100%;
  border: utils.toRem(2px) solid variables.$iota;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s ease;
  background: variables.$kappa;
  color: variables.$alpha;

  &:focus {
    border-color: variables.$beta;
  }

  &::placeholder {
    color: variables.$delta;
  }

  &--sm {
    padding: 0.5rem 0.75rem;
    font-size: utils.toRem(14px);
  }

  &--md {
    padding: 0.75rem 1rem;
    font-size: utils.toRem(16px);
  }

  &--lg {
    padding: 1rem 1.25rem;
    font-size: utils.toRem(18px);
  }
}
</style>
