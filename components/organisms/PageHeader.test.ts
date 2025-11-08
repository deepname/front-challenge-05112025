import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PageHeader from './PageHeader.vue';

describe('PageHeader', () => {
  it('renders default title', () => {
    // Arrange & Act
    const wrapper = mount(PageHeader, {
      props: { title: 'News Browser' },
    });

    // Assert
    const title = wrapper.find('h1');
    expect(title.text()).toBe('News Browser');
  });

  it('renders slot content instead of prop when provided', () => {
    // Arrange & Act
    const wrapper = mount(PageHeader, {
      props: { title: 'Prop Title' },
      slots: { default: 'Slot Title' },
    });

    // Assert
    const title = wrapper.find('h1');
    expect(title.text()).toBe('Slot Title');
  });

  it('renders actions slot when provided', () => {
    // Arrange & Act
    const wrapper = mount(PageHeader, {
      slots: {
        actions: '<button>Action 1</button><button>Action 2</button>',
      },
    });

    // Assert
    const nav = wrapper.find('nav');
    expect(nav.exists()).toBe(true);
    expect(nav.classes()).toContain('page-header__actions');
    expect(nav.findAll('button').length).toBe(2);
  });

  it('does not render actions nav when slot is empty', () => {
    // Arrange & Act
    const wrapper = mount(PageHeader);

    // Assert
    const nav = wrapper.find('nav');
    expect(nav.exists()).toBe(false);
  });
});
