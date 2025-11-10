import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useSearchMemory } from './useSearchMemory';

type StorageMock = {
  getItem: ReturnType<typeof vi.fn>;
  setItem: ReturnType<typeof vi.fn>;
  removeItem: ReturnType<typeof vi.fn>;
  clear: ReturnType<typeof vi.fn>;
  key: ReturnType<typeof vi.fn>;
  length: number;
};

describe('useSearchMemory', () => {
  const STORAGE_KEY = 'news-last-search';
  let storageMock: StorageMock;

  beforeEach(() => {
    storageMock = {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0,
    };

    const windowMock = {
      sessionStorage: storageMock,
    } as unknown as Window & typeof globalThis;

    vi.stubGlobal('window', windowMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('stores trimmed search term', () => {
    const { rememberLastSearch } = useSearchMemory();

    rememberLastSearch('  latest news  ');

    expect(storageMock.setItem).toHaveBeenCalledWith(STORAGE_KEY, 'latest news');
    expect(storageMock.removeItem).not.toHaveBeenCalled();
  });

  it('removes stored term when value is blank', () => {
    const { rememberLastSearch } = useSearchMemory();

    rememberLastSearch('   ');

    expect(storageMock.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
    expect(storageMock.setItem).not.toHaveBeenCalled();
  });

  it('loads stored term when available', () => {
    storageMock.getItem.mockReturnValueOnce('reactive query');
    const { loadLastSearch } = useSearchMemory();

    const result = loadLastSearch();

    expect(result).toBe('reactive query');
    expect(storageMock.getItem).toHaveBeenCalledWith(STORAGE_KEY);
  });

  it('returns empty string when sessionStorage unavailable', () => {
    vi.unstubAllGlobals();
    vi.stubGlobal('window', {} as Window & typeof globalThis);

    const { loadLastSearch, rememberLastSearch } = useSearchMemory();

    rememberLastSearch('ignored');
    const result = loadLastSearch();

    expect(result).toBe('');
  });
});
