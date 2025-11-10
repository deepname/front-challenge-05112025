import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, fn, userEvent, within } from '@storybook/test';
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
    onClick: fn(),
  },
  render: args => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Click Me</BaseButton>',
  }),
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /click me/i });

    await userEvent.click(button);

    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    onClick: fn(),
  },
  render: args => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Secondary</BaseButton>',
  }),
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /Secondary/i });

    await userEvent.click(button);

    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    onClick: fn(),
  },
  render: args => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Ghost Button</BaseButton>',
  }),
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /Ghost Button/i });

    await userEvent.click(button);

    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    onClick: fn(),
  },
  render: args => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Small</BaseButton>',
  }),
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /Small/i });

    await userEvent.click(button);

    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    onClick: fn(),
  },
  render: args => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Large Button</BaseButton>',
  }),
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /Large Button/i });

    await userEvent.click(button);

    expect(args.onClick).toHaveBeenCalled();
  },
};
