import type { Meta, StoryObj } from '@storybook/vue3'
import FavoriteToggle from './FavoriteToggle.vue'

const meta = {
  title: 'Molecules/FavoriteToggle',
  component: FavoriteToggle,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Article title' },
    url: { control: 'text', description: 'Article URL' },
    score: { control: 'number', description: 'Article score' },
    user: { control: 'text', description: 'Article author' },
    age: { control: 'text', description: 'Article age' },
    comments: { control: 'number', description: 'Number of comments' },
  },
  args: {
    title: 'Example News Article',
    url: 'https://example.com',
    score: 150,
    user: 'johndoe',
    age: '2 hours ago',
    comments: 42,
  },
  render: (args) => ({
    components: { FavoriteToggle },
    setup() {
      const article = {
        title: args.title,
        url: args.url,
        score: args.score,
        user: args.user,
        age: args.age,
        comments: args.comments,
      }
      return { article }
    },
    template: '<FavoriteToggle :article="article" />',
  }),
} satisfies Meta<typeof FavoriteToggle>

export default meta
type Story = StoryObj<typeof meta>

export const NotFavorited: Story = {}

export const Favorited: Story = {
  render: (args) => ({
    components: { FavoriteToggle },
    setup() {
      const article = {
        title: args.title,
        url: args.url,
        score: args.score,
        user: args.user,
        age: args.age,
        comments: args.comments,
      }
      // Pre-add to favorites for this story
      const favoritesStore = globalThis.useFavoritesStore()
      favoritesStore.addFavorite(article)
      return { article }
    },
    template: '<FavoriteToggle :article="article" />',
  }),
}

export const Interactive: Story = {
  render: (args) => ({
    components: { FavoriteToggle },
    setup() {
      const article = {
        title: args.title,
        url: args.url,
        score: args.score,
        user: args.user,
        age: args.age,
        comments: args.comments,
      }
      return { article }
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <FavoriteToggle :article="article" />
        <span>Click to toggle favorite status</span>
      </div>
    `,
  }),
}
