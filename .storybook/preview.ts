import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { createPinia, defineStore } from 'pinia';
import { ref } from 'vue';
import '../assets/main.scss';

// Create mock favorites store
const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([]);

  function isFavorite(article) {
    return favorites.value.some(fav => fav.url === article.url);
  }

  function addFavorite(article) {
    if (!isFavorite(article)) {
      favorites.value = [...favorites.value, article];
    }
  }

  function removeFavorite(article) {
    favorites.value = favorites.value.filter(fav => fav.url !== article.url);
  }

  function toggleFavorite(article) {
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

// Setup Pinia and global mocks
const pinia = createPinia();
setup(app => {
  app.use(pinia);

  // Make store available globally
  app.config.globalProperties.useFavoritesStore = useFavoritesStore;

  // Mock NuxtLink as a simple anchor
  app.component('NuxtLink', {
    props: ['to'],
    template: '<a :href="to"><slot /></a>',
  });
});

// Make useFavoritesStore available globally for components
globalThis.useFavoritesStore = useFavoritesStore;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f3f4f6' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
};

export default preview;
