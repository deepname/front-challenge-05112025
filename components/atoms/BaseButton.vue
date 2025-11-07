<template>
  <button :type="type" class="base-button" :class="buttonClasses" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    variant: 'secondary',
    size: 'md',
    type: 'button',
  }
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => [
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
]);

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>

<style scoped lang="scss">
@use '~/assets/variables';
@use '~/assets/utils';

.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: utils.toRem(1px) solid transparent;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &--sm {
    padding: 0.25rem 0.5rem;
    font-size: utils.toRem(14px);
  }

  &--md {
    padding: 0.5rem 1rem;
    font-size: utils.toRem(16px);
  }

  &--lg {
    padding: 0.75rem 1.25rem;
    font-size: utils.toRem(18px);
  }

  &--primary {
    background-color: variables.$text-color-hover;
    color: variables.$bone-color;
    border-color: variables.$text-color-hover;

    &:hover {
      background-color: variables.$hover-color;
      border-color: variables.$hover-color;
    }
  }

  &--secondary {
    background-color: transparent;
    color: variables.$text-color;
    border-color: variables.$border-color;

    &:hover {
      background-color: variables.$background-color;
      border-color: variables.$text-color-hover;
    }
  }

  &--ghost {
    background-color: transparent;
    color: variables.$text-color;

    &:hover {
      color: variables.$text-color-hover;
    }
  }
}
</style>
