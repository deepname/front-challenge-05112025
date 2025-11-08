import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLayout from './AppLayout.vue';

describe('AppLayout', () => {
  it('renders default slot in main content', () => {
    // Arrange & Act
    const wrapper = mount(AppLayout, {
      slots: { default: '<p>Main content</p>' },
    });

    // Assert
    const main = wrapper.find('main');
    expect(main.classes()).toContain('app-layout__content');
    expect(main.find('p').text()).toBe('Main content');
  });

  it('renders header slot', () => {
    // Arrange & Act
    const wrapper = mount(AppLayout, {
      slots: { header: '<header>Header content</header>' },
    });

    // Assert
    const header = wrapper.find('header');
    expect(header.text()).toBe('Header content');
  });

  it('renders search slot when provided', () => {
    // Arrange & Act
    const wrapper = mount(AppLayout, {
      slots: { search: '<div>Search component</div>' },
    });

    // Assert
    const searchDiv = wrapper.find('.app-layout__search');
    expect(searchDiv.exists()).toBe(true);
    expect(searchDiv.find('div').text()).toBe('Search component');
  });

  it('does not render search div when slot is empty', () => {
    // Arrange & Act
    const wrapper = mount(AppLayout);

    // Assert
    const searchDiv = wrapper.find('.app-layout__search');
    expect(searchDiv.exists()).toBe(false);
  });
});
