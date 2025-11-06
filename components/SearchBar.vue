<template>
  <div class="search-bar">
    <input
      v-model="model"
      type="search"
      placeholder="Search news..."
      class="search-bar__input"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()
</script>

<style scoped lang="scss">
@use "~/assets/variables";
@use "~/assets/utils";

.search {
  &-bar {
    width: 100%;
    max-width: utils.toRem(600px);
    margin: 0 auto;
  }
  &-bar__input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid variables.$border-color;
    border-radius: 0.5rem;
    outline: none;
    transition: border-color 0.2s;
    &:focus {
      border-color: variables.$text-color-hover;
    }
    &::placeholder {
      color: variables.$text-placeholder-color;
    }
  }
}  
</style>
