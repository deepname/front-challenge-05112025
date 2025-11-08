import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import FavoriteToggle from './FavoriteToggle.vue';
import type { NewsArticle } from '~/types/news';
import { useFavoritesStore } from '~/stores/favoritesStore';

describe('FavoriteToggle', () => {
  const mockArticle: NewsArticle = {
    title: 'Test Article',
    url: 'https://test.com',
    score: 100,
    user: 'testuser',
    age: '1 hour ago',
    comments: 5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  describe('when article is not favorited', () => {
    it('renders unfavorited star icon', () => {
      // Arrange
      const wrapper = mount(FavoriteToggle, {
        props: { article: mockArticle },
      });

      // Act & Assert
      const icon = wrapper.find('.favorite-toggle__icon');
      expect(icon.text()).toBe('☆');
      expect(wrapper.classes()).not.toContain('favorite-toggle--active');
    });

    it('calls toggleFavorite when clicked', async () => {
      // Arrange
      const store = useFavoritesStore();
      const toggleSpy = vi.spyOn(store, 'toggleFavorite');

      const wrapper = mount(FavoriteToggle, {
        props: { article: mockArticle },
      });

      // Act
      await wrapper.findComponent({ name: 'BaseButton' }).trigger('click');

      // Assert
      expect(toggleSpy).toHaveBeenCalledWith(mockArticle);
    });
  });

  describe('when article is favorited', () => {
    it('renders favorited star icon with active class', () => {
      // Arrange
      const store = useFavoritesStore();
      store.$patch(state => {
        state.favorites = [mockArticle];
      });

      const wrapper = mount(FavoriteToggle, {
        props: { article: mockArticle },
      });

      // Act & Assert
      const icon = wrapper.find('.favorite-toggle__icon');
      expect(icon.text()).toBe('★');
      expect(wrapper.classes()).toContain('favorite-toggle--active');
    });
  });
});
