import type { Meta, StoryObj } from '@storybook/vue3'
import type { NewsArticle } from '~/types/news'
import ArticleCard from './ArticleCard.vue'

type ArticleStoryArgs = NewsArticle

const meta = {
  title: 'Organisms/ArticleCard',
  component: ArticleCard,
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
    title: 'Example News Article Title',
    url: 'https://example.com',
    score: 150,
    user: 'johndoe',
    age: '2 hours ago',
    comments: 42,
  },
  render: (args: ArticleStoryArgs) => ({
    components: { ArticleCard },
    setup: () => ({ article: args }),
    template: '<ArticleCard :article="article" />',
  }),
} satisfies Meta<ArticleStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongTitle: Story = {
  args: {
    title: 'This is a very long article title that demonstrates how the card handles longer content and wraps appropriately',
    score: 250,
    user: 'janedoe',
    age: '5 hours ago',
    comments: 128,
  },
}

export const HighScore: Story = {
  args: {
    title: 'Trending Article with High Engagement',
    score: 1500,
    user: 'topcontributor',
    age: '1 hour ago',
    comments: 500,
  },
}
