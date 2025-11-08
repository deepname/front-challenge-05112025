<template>
  <BaseButton
    variant="secondary"
    size="sm"
    :class="{ 'favorite-toggle--active': isFav }"
    @click="handleToggle"
  >
    <span class="favorite-toggle__icon">{{ isFav ? '★' : '☆' }}</span>
  </BaseButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from '../atoms/BaseButton.vue';
import type { NewsArticle } from '~/types/news';
import { useFavoritesStore } from '~/stores/favoritesStore';

const props = defineProps<{
  article: NewsArticle;
}>();

const favoritesStore = useFavoritesStore();

const isFav = computed(() => favoritesStore.isFavorite(props.article));

function handleToggle() {
  favoritesStore.toggleFavorite(props.article);
}
</script>

<style scoped lang="scss">
@use '~/assets/variables';

.favorite-toggle {
  &--active {
    background-color: variables.$lambda;
    border-color: variables.$nu;
  }

  &__icon {
    font-size: 1.25rem;
    color: variables.$nu;
  }
}
</style>
