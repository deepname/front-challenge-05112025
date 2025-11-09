import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import Favorites from './favorites.vue';
import type { NewsArticle } from '~/types/news';
import { useFavoritesStore } from '~/stores/favoritesStore';

describe('Favorites page', () => {
  const mockArticle: NewsArticle = {
    title: 'Favorite Article',
    url: 'https://example.com/fav',
    score: 200,
    user: 'favuser',
    age: '2 hours ago',
    comments: 10,
  };

  const stubs = {
    AppLayout: defineComponent({
      name: 'AppLayout',
      setup(_, { slots }) {
        return () => h('div', { class: 'app-layout-stub' }, [slots.header?.(), slots.default?.()]);
      },
    }),
    PageHeader: defineComponent({
      name: 'PageHeader',
      props: {
        title: {
          type: String,
          required: true,
        },
      },
      setup(props, { slots }) {
        return () =>
          h('header', { class: 'page-header-stub' }, [h('h1', props.title), slots.actions?.()]);
      },
    }),
    BaseLink: defineComponent({
      name: 'BaseLink',
      props: {
        to: {
          type: [String, Object],
          required: true,
        },
      },
      setup(props, { slots }) {
        return () => h('a', { 'data-to': props.to }, slots.default?.());
      },
    }),
    ArticleCard: defineComponent({
      name: 'ArticleCard',
      props: {
        article: {
          type: Object,
          required: true,
        },
      },
      setup() {
        return () => h('div', { class: 'article-card-stub' });
      },
    }),
  } as const;

  const mountFavorites = () =>
    mount(Favorites, {
      global: {
        stubs,
      },
    });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('shows empty state when no favorites', () => {
    const wrapper = mountFavorites();

    expect(wrapper.text()).toContain('No favorites yet');
    expect(wrapper.text()).toContain('Start adding articles from the main page!');
  });

  it('renders ArticleCard for each favorite', () => {
    const store = useFavoritesStore();
    store.$patch(state => {
      state.favorites = [mockArticle];
    });

    const wrapper = mountFavorites();

    const articleCards = wrapper.findAllComponents({ name: 'ArticleCard' });
    expect(articleCards).toHaveLength(1);
    expect(articleCards[0]!.props('article')).toEqual(mockArticle);
  });

  it('renders page header with title and back link', () => {
    const wrapper = mountFavorites();

    const header = wrapper.getComponent({ name: 'PageHeader' });
    expect(header.props('title')).toBe('Favorites');

    const backLink = wrapper.getComponent({ name: 'BaseLink' });
    expect(backLink.attributes('data-to')).toBe('/');
    expect(backLink.text()).toBe('Back to News');
  });

  it('uses AppLayout wrapper', () => {
    const wrapper = mountFavorites();

    const appLayout = wrapper.findComponent({ name: 'AppLayout' });
    expect(appLayout.exists()).toBe(true);
  });
});
