import { defineStore } from 'pinia';
import type { NewsArticle } from '~/types/news';

export const useNewsStore = defineStore('news', () => {
  const articles = ref<NewsArticle[]>([]);
  const currentPage = ref(1);
  const isLoading = ref(false);
  const searchQuery = ref('');
  const hasMore = ref(true);

  const { fetchPage, searchNews } = useNewsApi();

  async function loadMore() {
    if (isLoading.value || !hasMore.value) return;

    isLoading.value = true;

    try {
      if (searchQuery.value) {
        // Search mode - fetch all results
        const results = await searchNews(searchQuery.value);
        articles.value = results;
        hasMore.value = false;
      } else {
        // Pagination mode
        const newArticles = await fetchPage(currentPage.value);

        if (newArticles.length === 0) {
          hasMore.value = false;
        } else {
          articles.value = [...articles.value, ...newArticles];
          currentPage.value++;
        }
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function search(query: string) {
    searchQuery.value = query;
    articles.value = [];
    currentPage.value = 1;
    hasMore.value = true;

    if (query) {
      await loadMore();
    }
  }

  function reset() {
    articles.value = [];
    currentPage.value = 1;
    searchQuery.value = '';
    hasMore.value = true;
  }

  return {
    articles,
    isLoading,
    searchQuery,
    hasMore,
    loadMore,
    search,
    reset,
  };
});
