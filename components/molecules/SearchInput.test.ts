import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchInput from './SearchInput.vue';

describe('SearchInput', () => {
  it('renders BaseInput with search type and lg size', () => {
    // Arrange & Act
    const wrapper = mount(SearchInput);

    // Assert
    const input = wrapper.findComponent({ name: 'BaseInput' });
    expect(input.exists()).toBe(true);
    expect(input.props('type')).toBe('search');
    expect(input.props('size')).toBe('lg');
    expect(input.props('placeholder')).toBe('Search news...');
    expect(wrapper.classes()).toContain('search-input');
  });

  it('supports v-model binding', async () => {
    // Arrange
    const wrapper = mount(SearchInput, {
      props: { modelValue: 'initial search' },
    });

    // Act
    const input = wrapper.findComponent({ name: 'BaseInput' });
    await input.vm.$emit('update:modelValue', 'updated search');

    // Assert
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['updated search']);
  });
});
