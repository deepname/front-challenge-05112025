import type { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from './BaseButton.vue';

const meta = {
  title: 'Atoms/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: args => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Click Me</BaseButton>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: args => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Secondary</BaseButton>',
  }),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
  render: args => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Ghost Button</BaseButton>',
  }),
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
  },
  render: args => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Small</BaseButton>',
  }),
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
  },
  render: args => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Large Button</BaseButton>',
  }),
};
