<template>
  <NuxtLink :to="to" class="base-link" :class="linkClasses">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

const props = withDefaults(
  defineProps<{
    to: RouteLocationRaw;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    variant: 'primary',
    size: 'md',
  }
);

const linkClasses = computed(() => [`base-link--${props.variant}`, `base-link--${props.size}`]);
</script>

<style scoped lang="scss">
@use '~/assets/variables';
@use '~/assets/utils';

.base-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  text-decoration: none;
  border-radius: 0.375rem;
  font-weight: 500;
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

    &:hover {
      background-color: variables.$gamma;
    }
  }

  &--secondary {
    background-color: transparent;
    color: variables.$alpha;
    border: utils.toRem(1px) solid variables.$iota;

    &:hover {
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
