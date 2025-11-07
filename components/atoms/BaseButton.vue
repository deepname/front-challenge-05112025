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
    background-color: variables.$beta;
    color: variables.$kappa;
    border-color: variables.$beta;

    &:hover {
      background-color: variables.$gamma;
      border-color: variables.$gamma;
    }
  }

  &--secondary {
    background-color: transparent;
    color: variables.$alpha;
    border-color: variables.$iota;

    &:hover {
      background-color: variables.$lambda;
      border-color: variables.$beta;
    }
  }

  &--ghost {
    background-color: transparent;
    color: variables.$alpha;

    &:hover {
      color: variables.$beta;
    }
  }
}
</style>
