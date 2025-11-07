import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SearchInput from './SearchInput.vue'

const meta = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { SearchInput },
    setup() {
      const searchQuery = ref('')
      return { searchQuery }
    },
    template: '<SearchInput v-model="searchQuery" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { SearchInput },
    setup() {
      const searchQuery = ref('Vue.js')
      return { searchQuery }
    },
    template: '<SearchInput v-model="searchQuery" />',
  }),
}
