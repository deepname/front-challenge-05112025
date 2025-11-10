const STORAGE_KEY = 'news-last-search';

function getStorage() {
  if (typeof window === 'undefined' || typeof window.sessionStorage === 'undefined') {
    return null;
  }

  return window.sessionStorage;
}

export function useSearchMemory() {
  const storage = getStorage();

  const rememberLastSearch = (value: string) => {
    if (!storage) return;

    const trimmed = value.trim();
    if (!trimmed) {
      storage.removeItem(STORAGE_KEY);
      return;
    }

    storage.setItem(STORAGE_KEY, trimmed);
  };

  const loadLastSearch = (): string => {
    if (!storage) return '';

    return storage.getItem(STORAGE_KEY) ?? '';
  };

  return {
    rememberLastSearch,
    loadLastSearch,
  } as const;
}
