import { describe, it, expect, vi } from 'vitest';
import { useNewsApi } from './useNewsApi';

describe('useNewsApi', () => {
  const mockArticles = [
    {
      title: 'Test Article',
      url: 'https://test.com',
      score: 100,
      user: 'testuser',
      age: '1 hour ago',
      comments: 5,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchPage calls $fetch with correct URL', async () => {
    const $fetchSpy = vi.fn().mockResolvedValue(mockArticles);
    global.$fetch = $fetchSpy;

    const { fetchPage } = useNewsApi();
    const result = await fetchPage(1);

    expect($fetchSpy).toHaveBeenCalledWith('/api/1');
    expect(result).toEqual(mockArticles);
  });

  it('searchNews calls $fetch with correct URL and query when query is provided', async () => {
    const $fetchSpy = vi.fn().mockResolvedValue(mockArticles);
    global.$fetch = $fetchSpy;

    const { searchNews } = useNewsApi();
    const result = await searchNews('test query');

    expect($fetchSpy).toHaveBeenCalledWith('/api/search', {
      query: { text: 'test query' },
    });
    expect(result).toEqual(mockArticles);
  });

  it('searchNews returns empty array when query is empty', async () => {
    const $fetchSpy = vi.fn();
    global.$fetch = $fetchSpy;

    const { searchNews } = useNewsApi();
    const result = await searchNews('   ');

    expect($fetchSpy).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('searchNews trims query', async () => {
    const $fetchSpy = vi.fn().mockResolvedValue(mockArticles);
    global.$fetch = $fetchSpy;

    const { searchNews } = useNewsApi();
    const result = await searchNews('  test query  ');

    expect($fetchSpy).toHaveBeenCalledWith('/api/search', {
      query: { text: 'test query' },
    });
    expect(result).toEqual(mockArticles);
  });
});
