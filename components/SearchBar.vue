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
  $color_1: #9ca3af;
  $border-color_1: #2563eb;
  $border-color_2: #e5e7eb;
  
  .search-bar {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  .search-bar__input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid $border-color_2;
    border-radius: 0.5rem;
    outline: none;
    transition: border-color 0.2s;
    &:focus {
      border-color: $border-color_1;
    }
    &::placeholder {
      color: $color_1;
    }
  }
</style>
