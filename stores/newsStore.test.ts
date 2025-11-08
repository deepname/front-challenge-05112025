import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useNewsStore } from './newsStore';
import type { NewsArticle } from '~/types/news';
import { useNewsApi } from '~/composables/useNewsApi';

vi.mock('~/composables/useNewsApi', () => ({
  useNewsApi: vi.fn(),
}));

describe('useNewsStore', () => {
  const mockArticles: NewsArticle[] = [
    {
      title: 'Article 1',
      url: 'https://example.com/1',
      score: 100,
      user: 'user1',
      age: '1 hour ago',
      comments: 5,
    },
    {
      title: 'Article 2',
      url: 'https://example.com/2',
      score: 200,
      user: 'user2',
      age: '2 hours ago',
      comments: 10,
    },
  ];

  let fetchPage: ReturnType<typeof vi.fn>;
  let searchNews: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();

    fetchPage = vi.fn();
    searchNews = vi.fn();

    vi.mocked(useNewsApi).mockReturnValue({
      fetchPage,
      searchNews,
    });
  });

  it('initializes with correct default values', () => {
    const store = useNewsStore();

    expect(store.articles).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.searchQuery).toBe('');
    expect(store.hasMore).toBe(true);
  });

  describe('loadMore', () => {
    it('does not load when already loading', async () => {
      const store = useNewsStore();
      store.isLoading = true;

      await store.loadMore();

      expect(store.isLoading).toBe(true);
    });

    it('does not load when no more articles', async () => {
      const store = useNewsStore();
      store.hasMore = false;

      await store.loadMore();

      expect(store.hasMore).toBe(false);
    });

    it('loads search results when search query exists', async () => {
      const store = useNewsStore();
      searchNews.mockResolvedValue(mockArticles);
      store.searchQuery = 'test query';

      await store.loadMore();

      expect(searchNews).toHaveBeenCalledWith('test query');
      expect(store.articles).toEqual(mockArticles);
      expect(store.hasMore).toBe(false);
      expect(store.isLoading).toBe(false);
    });

    it('loads paginated articles when no search query', async () => {
      const store = useNewsStore();
      fetchPage.mockResolvedValueOnce(mockArticles).mockResolvedValueOnce([mockArticles[0]]);

      await store.loadMore();
      await store.loadMore();

      expect(fetchPage).toHaveBeenNthCalledWith(1, 1);
      expect(fetchPage).toHaveBeenNthCalledWith(2, 2);
      expect(store.articles).toEqual([...mockArticles, mockArticles[0]]);
      expect(store.hasMore).toBe(true);
      expect(store.isLoading).toBe(false);
    });

    it('handles empty results in pagination', async () => {
      const store = useNewsStore();
      fetchPage.mockResolvedValue([]);

      await store.loadMore();

      expect(fetchPage).toHaveBeenCalledWith(1);
      expect(store.articles).toEqual([]);
      expect(store.hasMore).toBe(false);
    });

    it('handles errors gracefully', async () => {
      const store = useNewsStore();
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      fetchPage.mockRejectedValue(new Error('Network error'));

      await store.loadMore();

      expect(consoleSpy).toHaveBeenCalledWith('Failed to load articles:', expect.any(Error));
      expect(store.isLoading).toBe(false);
    });
  });

  describe('search', () => {
    it('performs search and stores results', async () => {
      const store = useNewsStore();
      store.$patch({
        articles: [mockArticles[0]],
        hasMore: false,
      });
      searchNews.mockResolvedValue(mockArticles);

      await store.search('new query');

      expect(store.searchQuery).toBe('new query');
      expect(searchNews).toHaveBeenCalledWith('new query');
      expect(fetchPage).not.toHaveBeenCalled();
      expect(store.articles).toEqual(mockArticles);
      expect(store.hasMore).toBe(false);
    });

    it('skips fetching when query is empty', async () => {
      const store = useNewsStore();

      await store.search('');

      expect(fetchPage).not.toHaveBeenCalled();
      expect(searchNews).not.toHaveBeenCalled();
      expect(store.articles).toEqual([]);
      expect(store.hasMore).toBe(true);
    });
  });

  describe('reset', () => {
    it('resets all state to initial values', () => {
      const store = useNewsStore();
      store.articles = mockArticles;
      store.searchQuery = 'search';
      store.hasMore = false;

      store.reset();

      expect(store.articles).toEqual([]);
      expect(store.searchQuery).toBe('');
      expect(store.hasMore).toBe(true);
    });
  });
});
