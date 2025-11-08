import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { ref, reactive, nextTick, defineComponent, h, type Ref } from 'vue';
import Index from './index.vue';
import type { NewsArticle } from '~/types/news';
import { useNewsStore } from '~/stores/newsStore';
import { useFavoritesStore } from '~/stores/favoritesStore';
import { useUrlSync } from '~/composables/useUrlSync';
import { useInfiniteScroll } from '~/composables/useInfiniteScroll';

vi.mock('~/stores/newsStore', () => ({
  useNewsStore: vi.fn(),
}));

vi.mock('~/stores/favoritesStore', () => ({
  useFavoritesStore: vi.fn(),
}));

vi.mock('~/composables/useUrlSync', () => ({
  useUrlSync: vi.fn(),
}));

vi.mock('~/composables/useInfiniteScroll', () => ({
  useInfiniteScroll: vi.fn(),
}));

type MockNewsStore = {
  articles: NewsArticle[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: ReturnType<typeof vi.fn>;
  search: ReturnType<typeof vi.fn>;
  reset: ReturnType<typeof vi.fn>;
};

type MockFavoritesStore = {
  favorites: NewsArticle[];
};

const stubs = {
  AppLayout: defineComponent({
    name: 'AppLayout',
    setup(_, { slots }) {
      return () =>
        h('div', { class: 'app-layout-stub' }, [
          slots.header?.(),
          slots.search ? h('div', { class: 'app-layout-search' }, slots.search()) : null,
          h('main', { class: 'app-layout-content' }, slots.default?.()),
        ]);
    },
  }),
  PageHeader: defineComponent({
    name: 'PageHeader',
    props: {
      title: { type: String, required: true },
    },
    setup(props, { slots }) {
      return () =>
        h('div', { class: 'page-header-stub' }, [
          h('span', { class: 'page-header-title' }, props.title),
          slots.actions?.(),
        ]);
    },
  }),
  BaseLink: defineComponent({
    name: 'BaseLink',
    props: {
      to: { type: [String, Object], required: true },
    },
    setup(props, { slots }) {
      return () =>
        h(
          'a',
          {
            class: 'base-link-stub',
            href: typeof props.to === 'string' ? props.to : '#',
          },
          slots.default?.()
        );
    },
  }),
  SearchInput: defineComponent({
    name: 'SearchInput',
    props: {
      modelValue: { type: String, default: '' },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      return () =>
        h('input', {
          class: 'search-input-stub',
          value: props.modelValue,
          onInput: (event: Event) => {
            emit('update:modelValue', (event.target as HTMLInputElement).value);
          },
        });
    },
  }),
  ArticleCard: defineComponent({
    name: 'ArticleCard',
    props: {
      article: { type: null, required: true },
    },
    setup(props) {
      return () => h('div', { class: 'article-card-stub' }, props.article?.title ?? '');
    },
  }),
} as const;

const mountIndex = () =>
  mount(Index, {
    global: {
      stubs,
    },
  });

describe('Index page', () => {
  const mockArticle: NewsArticle = {
    title: 'Test Article',
    url: 'https://example.com',
    score: 100,
    user: 'testuser',
    age: '1 hour ago',
    comments: 5,
  };

  let mockNewsStore: MockNewsStore;
  let mockFavoritesStore: MockFavoritesStore;
  let urlSyncState: Ref<string>;

  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());

    mockNewsStore = reactive({
      articles: [],
      isLoading: false,
      hasMore: true,
      loadMore: vi.fn(),
      search: vi.fn(),
      reset: vi.fn(),
    }) as MockNewsStore;

    mockFavoritesStore = reactive({
      favorites: [],
    }) as MockFavoritesStore;

    vi.mocked(useNewsStore).mockReturnValue(
      mockNewsStore as unknown as ReturnType<typeof useNewsStore>
    );
    vi.mocked(useFavoritesStore).mockReturnValue(
      mockFavoritesStore as unknown as ReturnType<typeof useFavoritesStore>
    );
    vi.mocked(useUrlSync).mockImplementation((_, state) => {
      urlSyncState = state;
      return { state };
    });
    vi.mocked(useInfiniteScroll).mockReturnValue({ sentinel: ref<HTMLElement | null>(null) });
  });

  const flushUpdates = async () => {
    await nextTick();
    await nextTick();
  };

  it('renders loading state when loading and no articles', async () => {
    mockNewsStore.isLoading = true;
    mockNewsStore.articles = [];

    const wrapper = mountIndex();

    await flushUpdates();

    expect(wrapper.html()).toContain('Loading...');
  });

  it('renders empty state when no articles and not loading', async () => {
    mockNewsStore.articles = [];

    const wrapper = mountIndex();

    await flushUpdates();

    expect(wrapper.html()).toContain('No articles found');
  });

  it('renders ArticleCard for each article', async () => {
    mockNewsStore.articles = [mockArticle];

    const wrapper = mountIndex();

    await flushUpdates();

    const articleCards = wrapper.findAllComponents({ name: 'ArticleCard' });
    expect(articleCards).toHaveLength(1);
    expect(articleCards[0]!.props('article')).toEqual(mockArticle);
  });

  it('shows loading more indicator when loading and has articles', async () => {
    mockNewsStore.articles = [mockArticle];
    mockNewsStore.isLoading = true;

    const wrapper = mountIndex();

    await flushUpdates();

    expect(wrapper.html()).toContain('Loading more...');
  });

  it('renders page header with title and favorites link', async () => {
    mockFavoritesStore.favorites = [mockArticle];

    const wrapper = mountIndex();

    await flushUpdates();

    const header = wrapper.findComponent({ name: 'PageHeader' });
    expect(header.props('title')).toBe('News Browser');

    const favoritesLink = wrapper.findComponent({ name: 'BaseLink' });
    expect(favoritesLink.props('to')).toBe('/favorites');
    expect(favoritesLink.text()).toContain('Favorites (1)');
  });

  it('includes SearchInput in search slot', () => {
    const wrapper = mountIndex();

    const searchInput = wrapper.findComponent({ name: 'SearchInput' });
    expect(searchInput.exists()).toBe(true);
  });

  it('uses AppLayout wrapper', () => {
    const wrapper = mountIndex();

    const appLayout = wrapper.findComponent({ name: 'AppLayout' });
    expect(appLayout.exists()).toBe(true);
  });

  it('calls loadMore on mount when no articles and no search', async () => {
    mountIndex();

    await flushUpdates();

    expect(mockNewsStore.loadMore).toHaveBeenCalled();
  });

  it('watches search query and calls search when query provided', async () => {
    mountIndex();

    urlSyncState.value = 'test search';

    await flushUpdates();

    expect(mockNewsStore.search).toHaveBeenCalledWith('test search');
  });

  it('calls reset and loadMore when search query cleared', async () => {
    mountIndex();

    urlSyncState.value = 'existing';
    await flushUpdates();

    mockNewsStore.reset.mockClear();
    mockNewsStore.loadMore.mockClear();

    urlSyncState.value = '';

    await flushUpdates();

    expect(mockNewsStore.reset).toHaveBeenCalled();
    expect(mockNewsStore.loadMore).toHaveBeenCalled();
  });
});
