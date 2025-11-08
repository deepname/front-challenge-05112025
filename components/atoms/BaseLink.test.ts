import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import BaseLink from './BaseLink.vue';

describe('BaseLink', () => {
  const NuxtLinkStub = defineComponent({
    name: 'NuxtLink',
    props: {
      to: {
        type: [String, Object],
        required: true,
      },
    },
    setup(props, { slots }) {
      return () =>
        h('a', { href: typeof props.to === 'string' ? props.to : '#' }, slots.default?.());
    },
  });

  const globalConfig = {
    stubs: {
      NuxtLink: NuxtLinkStub,
    },
  } as const;

  it('renders NuxtLink with default props', () => {
    // Arrange & Act
    const wrapper = mount(BaseLink, {
      props: { to: '/home' },
      global: globalConfig,
    });

    // Assert
    const link = wrapper.findComponent({ name: 'NuxtLink' });
    expect(link.exists()).toBe(true);
    expect(link.props('to')).toBe('/home');
    expect(wrapper.classes()).toContain('base-link--primary');
    expect(wrapper.classes()).toContain('base-link--md');
  });

  it('applies correct variant class', () => {
    // Arrange & Act
    const wrapper = mount(BaseLink, {
      props: {
        to: '/test',
        variant: 'secondary',
      },
      global: globalConfig,
    });

    // Assert
    expect(wrapper.classes()).toContain('base-link--secondary');
  });

  it('applies correct size class', () => {
    // Arrange & Act
    const wrapper = mount(BaseLink, {
      props: {
        to: '/test',
        size: 'lg',
      },
      global: globalConfig,
    });

    // Assert
    expect(wrapper.classes()).toContain('base-link--lg');
  });

  it('passes to prop correctly', () => {
    // Arrange & Act
    const wrapper = mount(BaseLink, {
      props: {
        to: { name: 'test-route' },
      },
      global: globalConfig,
    });

    // Assert
    const link = wrapper.findComponent({ name: 'NuxtLink' });
    expect(link.props('to')).toEqual({ name: 'test-route' });
  });

  it('renders slot content', () => {
    // Arrange & Act
    const wrapper = mount(BaseLink, {
      props: { to: '/test' },
      slots: { default: 'Link Text' },
      global: globalConfig,
    });

    // Assert
    expect(wrapper.text()).toBe('Link Text');
  });
});
