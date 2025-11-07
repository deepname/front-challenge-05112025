import type { Meta, StoryObj } from '@storybook/vue3'
import FavoriteToggle from './FavoriteToggle.vue'

const meta = {
  title: 'Molecules/FavoriteToggle',
  component: FavoriteToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof FavoriteToggle>

export default meta
type Story = StoryObj<typeof meta>

const mockArticle = {
  title: 'Example News Article',
  url: 'https://example.com',
  score: 150,
  user: 'johndoe',
  age: '2 hours ago',
  comments: 42,
}

export const NotFavorited: Story = {
  args: {
    article: mockArticle,
  },
}

export const Favorited: Story = {
  args: {
    article: mockArticle,
  },
  render: (args) => ({
    components: { FavoriteToggle },
    setup() {
      // Pre-add to favorites for this story
      const favoritesStore = globalThis.useFavoritesStore()
      favoritesStore.addFavorite(args.article)
      return { args }
    },
    template: '<FavoriteToggle v-bind="args" />',
  }),
}

export const Interactive: Story = {
  args: {
    article: mockArticle,
  },
  render: (args) => ({
    components: { FavoriteToggle },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <FavoriteToggle v-bind="args" />
        <span>Click to toggle favorite status</span>
      </div>
    `,
  }),
}
