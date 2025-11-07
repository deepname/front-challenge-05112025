<template>
  <div class="app-layout">
    <slot name="header" />

    <div v-if="$slots.search" class="app-layout__search">
      <slot name="search" />
    </div>

    <main class="app-layout__content">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/variables';
@use '~/assets/utils';

.app-layout {
  max-width: utils.toRem(1200px);
  margin: 0 auto;
  padding: 1rem;

  &__search {
    margin-bottom: 2rem;
  }

  &__content {
    background: variables.$bone-color;
    border-radius: 0.5rem;
    box-shadow: 0 utils.toRem(1px) utils.toRem(3px) rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
}
</style>
