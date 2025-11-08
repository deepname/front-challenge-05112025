import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ArticleCard from './ArticleCard.vue';
import type { NewsArticle } from '~/types/news';

describe('ArticleCard', () => {
  const mockArticle: NewsArticle = {
    title: 'Test Article Title',
    url: 'https://example.com/article',
    score: 150,
    user: 'testuser',
    age: '2 hours ago',
    comments: 25,
  };

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders article data correctly', () => {
    // Arrange & Act
    const wrapper = mount(ArticleCard, {
      props: { article: mockArticle },
    });

    // Assert
    const titleLink = wrapper.find('a');
    expect(titleLink.attributes('href')).toBe(mockArticle.url);
    expect(titleLink.text()).toBe(mockArticle.title);

    expect(wrapper.text()).toContain('150 points');
    expect(wrapper.text()).toContain('by testuser');
    expect(wrapper.text()).toContain('2 hours ago');
    expect(wrapper.text()).toContain('25 comments');
  });

  it('passes article to FavoriteToggle', () => {
    // Arrange & Act
    const wrapper = mount(ArticleCard, {
      props: { article: mockArticle },
    });

    // Assert
    const favoriteToggle = wrapper.findComponent({ name: 'FavoriteToggle' });
    expect(favoriteToggle.props('article')).toEqual(mockArticle);
  });

  it('renders separators between meta items', () => {
    // Arrange & Act
    const wrapper = mount(ArticleCard, {
      props: { article: mockArticle },
    });

    // Assert
    const separators = wrapper.findAll('.article-card__separator');
    expect(separators.length).toBe(3);
    separators.forEach(separator => {
      expect(separator.text()).toBe('•');
    });
  });
});
