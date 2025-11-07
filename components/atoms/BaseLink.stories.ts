import type { Meta, StoryObj } from '@storybook/vue3'
import BaseLink from './BaseLink.vue'

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
} satisfies Meta<typeof BaseLink>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    to: '/',
    variant: 'primary',
    size: 'md',
  },
  render: (args) => ({
    components: { BaseLink },
    setup() {
      return { args }
    },
    template: '<BaseLink v-bind="args">Primary Link</BaseLink>',
  }),
}

export const Secondary: Story = {
  args: {
    to: '/',
    variant: 'secondary',
    size: 'md',
  },
  render: (args) => ({
    components: { BaseLink },
    setup() {
      return { args }
    },
    template: '<BaseLink v-bind="args">Secondary Link</BaseLink>',
  }),
}

export const Ghost: Story = {
  args: {
    to: '/',
    variant: 'ghost',
    size: 'md',
  },
  render: (args) => ({
    components: { BaseLink },
    setup() {
      return { args }
    },
    template: '<BaseLink v-bind="args">Ghost Link</BaseLink>',
  }),
}
