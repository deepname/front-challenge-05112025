import type { Meta, StoryObj } from '@storybook/vue3'
import BaseInput from './BaseInput.vue'

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
} satisfies Meta<typeof BaseInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'md',
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    size: 'lg',
  },
}

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    size: 'lg',
  },
}
