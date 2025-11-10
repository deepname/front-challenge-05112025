import { expect, fn, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseInput from './BaseInput.vue';

const meta = {
  title: 'Atoms/BaseInput',
  component: BaseInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'number'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof BaseInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'md',
    modelValue: '',
    'onUpdate:modelValue': fn(),
  },
  render: args => ({
    components: { BaseInput },
    setup() {
      return { args };
    },
    template: '<BaseInput v-bind="args" />',
  }),
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(/enter text/i);

    await userEvent.type(input, 'hello');

    expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('hello');
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    size: 'lg',
    modelValue: '',
    'onUpdate:modelValue': fn(),
  },
  render: args => ({
    components: { BaseInput },
    setup() {
      return { args };
    },
    template: '<BaseInput v-bind="args" />',
  }),
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(/search/i);

    await userEvent.type(input, 'news');

    expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('news');
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    size: 'sm',
    modelValue: '',
    'onUpdate:modelValue': fn(),
  },
  render: args => ({
    components: { BaseInput },
    setup() {
      return { args };
    },
    template: '<BaseInput v-bind="args" />',
  }),
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(/small input/i);

    await userEvent.type(input, 'ok');

    expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('ok');
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    size: 'lg',
    modelValue: '',
    'onUpdate:modelValue': fn(),
  },
  render: args => ({
    components: { BaseInput },
    setup() {
      return { args };
    },
    template: '<BaseInput v-bind="args" />',
  }),
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(/large input/i);

    await userEvent.type(input, 'wide');

    expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('wide');
  },
};
