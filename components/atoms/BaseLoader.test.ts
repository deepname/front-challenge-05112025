import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseLoader from './BaseLoader.vue';

describe('BaseLoader', () => {
  it('renders span with loader class', () => {
    // Arrange & Act
    const wrapper = mount(BaseLoader);

    // Assert
    const span = wrapper.find('span');
    expect(span.exists()).toBe(true);
    expect(span.classes()).toContain('loader');
  });
});
