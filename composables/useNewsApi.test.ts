import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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

  type FetchMock = ReturnType<typeof vi.fn> & typeof globalThis.$fetch;

  const createFetchMock = () => {
    const mock = vi.fn() as FetchMock;
    mock.raw = vi.fn();
    mock.create = vi.fn();
    return mock;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetchPage calls $fetch with correct URL', async () => {
    const $fetchSpy = createFetchMock().mockResolvedValue(mockArticles);
    vi.stubGlobal('$fetch', $fetchSpy);

    const { fetchPage } = useNewsApi();
    const result = await fetchPage(1);

    expect($fetchSpy).toHaveBeenCalledWith('/api/1');
    expect(result).toEqual(mockArticles);
  });

  it('searchNews calls $fetch with correct URL and query when query is provided', async () => {
    const $fetchSpy = createFetchMock().mockResolvedValue(mockArticles);
    vi.stubGlobal('$fetch', $fetchSpy);

    const { searchNews } = useNewsApi();
    const result = await searchNews('test query');

    expect($fetchSpy).toHaveBeenCalledWith('/api/search', {
      query: { text: 'test query' },
    });
    expect(result).toEqual(mockArticles);
  });

  it('searchNews returns empty array when query is empty', async () => {
    const $fetchSpy = createFetchMock();
    vi.stubGlobal('$fetch', $fetchSpy);

    const { searchNews } = useNewsApi();
    const result = await searchNews('   ');

    expect($fetchSpy).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('searchNews trims query', async () => {
    const $fetchSpy = createFetchMock().mockResolvedValue(mockArticles);
    vi.stubGlobal('$fetch', $fetchSpy);

    const { searchNews } = useNewsApi();
    const result = await searchNews('  test query  ');

    expect($fetchSpy).toHaveBeenCalledWith('/api/search', {
      query: { text: 'test query' },
    });
    expect(result).toEqual(mockArticles);
  });
});
