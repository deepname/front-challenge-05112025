import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from './BaseButton.vue';

describe('BaseButton', () => {
  it('renders default button with secondary variant and md size', () => {
    // Arrange & Act
    const wrapper = mount(BaseButton);

    // Assert
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.classes()).toContain('base-button--secondary');
    expect(wrapper.classes()).toContain('base-button--md');
  });

  it('applies correct variant class', () => {
    // Arrange & Act
    const wrapper = mount(BaseButton, {
      props: { variant: 'primary' },
    });

    // Assert
    expect(wrapper.classes()).toContain('base-button--primary');
  });

  it('applies correct size class', () => {
    // Arrange & Act
    const wrapper = mount(BaseButton, {
      props: { size: 'sm' },
    });

    // Assert
    expect(wrapper.classes()).toContain('base-button--sm');
  });

  it('sets correct button type', () => {
    // Arrange & Act
    const wrapper = mount(BaseButton, {
      props: { type: 'submit' },
    });

    // Assert
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('renders slot content', () => {
    // Arrange & Act
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    });

    // Assert
    expect(wrapper.text()).toBe('Click me');
  });

  it('emits click event when button is clicked', async () => {
    // Arrange
    const wrapper = mount(BaseButton);

    // Act
    await wrapper.trigger('click');

    // Assert
    expect(wrapper.emitted('click')).toHaveLength(1);
    expect(wrapper.emitted('click')![0][0]).toBeInstanceOf(MouseEvent);
  });
});
