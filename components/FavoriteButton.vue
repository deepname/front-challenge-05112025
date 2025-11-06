<template>
  <button
    type="button"
    class="favorite-button"
    :class="{ 'favorite-button--active': isFav }"
    @click="handleToggle"
  >
    <span class="favorite-button__icon">{{ isFav ? '★' : '☆' }}</span>
  </button>
</template>

<script setup lang="ts">
import type { NewsArticle } from '~/types/news'

const props = defineProps<{
  article: NewsArticle
}>()

const favoritesStore = useFavoritesStore()

const isFav = computed(() => favoritesStore.isFavorite(props.article))

function handleToggle() {
  favoritesStore.toggleFavorite(props.article)
}
</script>

<style scoped lang="scss">
  $color_1: #f59e0b;
  $background-color_1: #fef3c7;
  $border-color_1: #fbbf24;
  $border-color_2: #f59e0b;
  $border-color_3: #e5e7eb;

  .favorite-button {
    padding: 0.25rem 0.5rem;
    background: transparent;
    border: 1px solid $border-color_3;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background-color: $background-color_1;
      border-color: $border-color_1;
    }
  }
  .favorite-button--active {
    background-color: $background-color_1;
    border-color: $border-color_2;
  }
  .favorite-button__icon {
    font-size: 1.25rem;
    color: $color_1;
  }
</style>
