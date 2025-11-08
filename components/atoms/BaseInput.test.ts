import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from './BaseInput.vue';

describe('BaseInput', () => {
  it('renders input with default props', () => {
    // Arrange & Act
    const wrapper = mount(BaseInput);

    // Assert
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('type')).toBe('text');
    expect(input.attributes('placeholder')).toBe('');
    expect(wrapper.classes()).toContain('base-input--md');
  });

  it('applies correct size class', () => {
    // Arrange & Act
    const wrapper = mount(BaseInput, {
      props: { size: 'lg' },
    });

    // Assert
    expect(wrapper.classes()).toContain('base-input--lg');
  });

  it('sets correct type and placeholder', () => {
    // Arrange & Act
    const wrapper = mount(BaseInput, {
      props: {
        type: 'email',
        placeholder: 'Enter email',
      },
    });

    // Assert
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('email');
    expect(input.attributes('placeholder')).toBe('Enter email');
  });

  it('supports v-model binding', async () => {
    // Arrange
    const wrapper = mount(BaseInput, {
      props: { modelValue: 'initial' },
    });

    // Act
    const input = wrapper.find('input');
    await input.setValue('updated value');

    // Assert
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['updated value']);
    expect((input.element as HTMLInputElement).value).toBe('updated value');
  });
});
