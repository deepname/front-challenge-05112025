import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { nextTick } from 'vue';
import type { NewsArticle } from '~/types/news';

type FavoritesStoreModule = typeof import('./favoritesStore');
type LocalStorageMock = {
  getItem: ReturnType<typeof vi.fn>;
  setItem: ReturnType<typeof vi.fn>;
  removeItem: ReturnType<typeof vi.fn>;
  clear: ReturnType<typeof vi.fn>;
  key: ReturnType<typeof vi.fn>;
  length: number;
};

describe('useFavoritesStore', () => {
  const articleA: NewsArticle = {
    title: 'Article A',
    url: 'https://example.com/a',
    score: 10,
    user: 'user-a',
    age: '1 hour ago',
    comments: 5,
  };

  const articleB: NewsArticle = {
    title: 'Article B',
    url: 'https://example.com/b',
    score: 20,
    user: 'user-b',
    age: '2 hours ago',
    comments: 3,
  };

  const STORAGE_KEY = 'news-favorites';

  let useFavoritesStore: FavoritesStoreModule['useFavoritesStore'];
  let localStorageMock: LocalStorageMock;
  let originalImportMetaClientDescriptor: PropertyDescriptor | undefined;

  beforeEach(async () => {
    vi.resetModules();

    localStorageMock = {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0,
    };

    vi.stubGlobal('localStorage', localStorageMock);

    const meta = import.meta as unknown as { client?: boolean };

    originalImportMetaClientDescriptor = Object.getOwnPropertyDescriptor(meta, 'client');
    Object.defineProperty(meta, 'client', {
      value: true,
      configurable: true,
      writable: true,
    });

    setActivePinia(createPinia());

    ({ useFavoritesStore } = await import('./favoritesStore'));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();

    const meta = import.meta as unknown as { client?: boolean };

    if (originalImportMetaClientDescriptor) {
      Object.defineProperty(meta, 'client', originalImportMetaClientDescriptor);
    } else {
      Reflect.deleteProperty(meta, 'client');
    }
  });

  it('initializes with empty favorites when no stored data exists', () => {
    localStorageMock.getItem.mockClear();

    const store = useFavoritesStore();

    expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEY);
    expect(store.favorites).toEqual([]);
  });

  it('loads favorites from localStorage on initialization', () => {
    localStorageMock.getItem.mockClear();
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([articleA]));

    const store = useFavoritesStore();

    expect(store.favorites).toEqual([articleA]);
  });

  it('persists new favorites to localStorage when added', async () => {
    const store = useFavoritesStore();
    localStorageMock.setItem.mockClear();

    store.addFavorite(articleA);
    await nextTick();

    expect(store.favorites).toEqual([articleA]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([articleA]));
  });

  it('does not duplicate favorites when adding the same article twice', async () => {
    const store = useFavoritesStore();

    store.addFavorite(articleA);
    await nextTick();
    localStorageMock.setItem.mockClear();

    store.addFavorite(articleA);
    await nextTick();

    expect(store.favorites).toEqual([articleA]);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('removes favorites and persists the updated list', async () => {
    const store = useFavoritesStore();

    store.addFavorite(articleA);
    await nextTick();
    store.addFavorite(articleB);
    await nextTick();
    localStorageMock.setItem.mockClear();

    store.removeFavorite(articleA);
    await nextTick();

    expect(store.favorites).toEqual([articleB]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([articleB]));
  });

  it('toggles favorites by adding when missing and removing when present', async () => {
    const store = useFavoritesStore();
    localStorageMock.setItem.mockClear();

    store.toggleFavorite(articleA);
    await nextTick();

    expect(store.favorites).toEqual([articleA]);
    expect(localStorageMock.setItem).toHaveBeenNthCalledWith(
      1,
      STORAGE_KEY,
      JSON.stringify([articleA])
    );

    store.toggleFavorite(articleA);
    await nextTick();

    expect(store.favorites).toEqual([]);
    expect(localStorageMock.setItem).toHaveBeenNthCalledWith(2, STORAGE_KEY, JSON.stringify([]));
  });

  it('logs an error when stored favorites cannot be parsed', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorageMock.getItem.mockClear();
    localStorageMock.getItem.mockReturnValueOnce('not-json');

    const store = useFavoritesStore();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to parse favorites from localStorage:',
      expect.any(SyntaxError)
    );
    expect(store.favorites).toEqual([]);
  });
});
