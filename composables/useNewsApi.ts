import type { NewsArticle } from '~/types/news';

export function useNewsApi() {
  // Use relative /api/* paths to leverage Nuxt's proxy
  async function fetchPage(page: number): Promise<NewsArticle[]> {
    return $fetch<NewsArticle[]>(`/api/${page}`);
  }

  async function searchNews(query: string): Promise<NewsArticle[]> {
    if (!query.trim()) {
      return [];
    }
    return $fetch<NewsArticle[]>('/api/search', {
      query: { text: query.trim() },
    });
  }

  return {
    fetchPage,
    searchNews,
  };
}
