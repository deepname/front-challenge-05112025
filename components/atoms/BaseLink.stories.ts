import { expect, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseLink from './BaseLink.vue';

const meta = {
  title: 'Atoms/BaseLink',
  component: BaseLink,
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
  },
} satisfies Meta<typeof BaseLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    to: '/',
    variant: 'primary',
    size: 'md',
  },
  render: args => ({
    components: { BaseLink },
    setup() {
      return { args };
    },
    template: '<BaseLink v-bind="args">Primary Link</BaseLink>',
  }),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const link = await canvas.findByRole('link', { name: /primary link/i });

    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveClass('base-link--primary');
    expect(link).toHaveClass('base-link--md');
  },
};

export const Secondary: Story = {
  args: {
    to: '/',
    variant: 'secondary',
    size: 'md',
  },
  render: args => ({
    components: { BaseLink },
    setup() {
      return { args };
    },
    template: '<BaseLink v-bind="args">Secondary Link</BaseLink>',
  }),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const link = await canvas.findByRole('link', { name: /secondary link/i });

    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveClass('base-link--secondary');
    expect(link).toHaveClass('base-link--md');
  },
};

export const Ghost: Story = {
  args: {
    to: '/',
    variant: 'ghost',
    size: 'md',
  },
  render: args => ({
    components: { BaseLink },
    setup() {
      return { args };
    },
    template: '<BaseLink v-bind="args">Ghost Link</BaseLink>',
  }),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const link = await canvas.findByRole('link', { name: /ghost link/i });

    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveClass('base-link--ghost');
    expect(link).toHaveClass('base-link--md');
  },
};
