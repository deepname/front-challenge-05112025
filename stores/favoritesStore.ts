import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { NewsArticle } from '~/types/news';

const STORAGE_KEY = 'news-favorites';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<NewsArticle[]>([]);
  const storageAvailable = typeof localStorage !== 'undefined';

  // Load from localStorage on initialization
  if (storageAvailable) {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        favorites.value = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
  }

  // Watch and persist to localStorage
  watch(
    favorites,
    newFavorites => {
      if (storageAvailable) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      }
    },
    { deep: true }
  );

  function isFavorite(article: NewsArticle): boolean {
    return favorites.value.some(fav => fav.url === article.url);
  }

  function addFavorite(article: NewsArticle) {
    if (!isFavorite(article)) {
      favorites.value = [...favorites.value, article];
    }
  }

  function removeFavorite(article: NewsArticle) {
    favorites.value = favorites.value.filter(fav => fav.url !== article.url);
  }

  function toggleFavorite(article: NewsArticle) {
    if (isFavorite(article)) {
      removeFavorite(article);
    } else {
      addFavorite(article);
    }
  }

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
});
