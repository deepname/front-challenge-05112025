<template>
  <header class="page-header">
    <h1 class="page-header__title">
      <slot>{{ title }}</slot>
    </h1>
    <nav v-if="$slots.actions" class="page-header__actions">
      <slot name="actions" />
    </nav>
  </header>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: '',
  }
);
</script>

<style scoped lang="scss">
@use '~/assets/variables';
@use '~/assets/utils';

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: utils.toRem(2px) solid variables.$iota;

  &__title {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    color: variables.$alpha;
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }
}
</style>
