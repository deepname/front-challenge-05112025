import type { Meta, StoryObj } from '@storybook/vue3'
import type { NewsArticle } from '~/types/news'
import { computed, defineComponent, h } from 'vue'
import FavoriteToggle from './FavoriteToggle.vue'

const articleProps = {
  title: { type: String, required: true },
  url: { type: String, required: true },
  score: { type: Number, required: true },
  user: { type: String, required: true },
  age: { type: String, required: true },
  comments: { type: Number, required: true },
} as const

const FavoriteTogglePreview = defineComponent({
  name: 'FavoriteTogglePreview',
  props: articleProps,
  setup(props) {
    const article = computed<NewsArticle>(() => ({
      title: props.title,
      url: props.url,
      score: props.score,
      user: props.user,
      age: props.age,
      comments: props.comments,
    }))

    return () => h(FavoriteToggle, { article: article.value })
  },
})

type FavoritesStore = {
  addFavorite(article: NewsArticle): void
  removeFavorite(article: NewsArticle): void
  isFavorite(article: NewsArticle): boolean
}

function getFavoritesStore(): FavoritesStore | undefined {
  const getter = (globalThis as typeof globalThis & {
    useFavoritesStore?: () => FavoritesStore
  }).useFavoritesStore
  return getter?.()
}

const meta: Meta<typeof FavoriteTogglePreview> = {
  title: 'Molecules/FavoriteToggle',
  component: FavoriteTogglePreview,
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
}

export default meta
type Story = StoryObj<typeof FavoriteTogglePreview>

export const NotFavorited: Story = {}

export const Favorited: Story = {
  play: async ({ args }) => {
    const store = getFavoritesStore()
    if (store) {
      store.addFavorite(args as NewsArticle)
    }
  },
}

export const Interactive: Story = {
  render: (args) => ({
    components: { FavoriteTogglePreview },
    setup: () => ({ args }),
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <FavoriteTogglePreview v-bind="args" />
        <span>Click to toggle favorite status</span>
      </div>
    `,
  }),
}
