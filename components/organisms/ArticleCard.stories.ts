import type { Meta, StoryObj } from '@storybook/vue3'
import ArticleCard from './ArticleCard.vue'

const meta = {
  title: 'Organisms/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    article: {
      title: 'Example News Article Title',
      url: 'https://example.com',
      score: 150,
      user: 'johndoe',
      age: '2 hours ago',
      comments: 42,
    },
  },
}

export const LongTitle: Story = {
  args: {
    article: {
      title: 'This is a very long article title that demonstrates how the card handles longer content and wraps appropriately',
      url: 'https://example.com',
      score: 250,
      user: 'janedoe',
      age: '5 hours ago',
      comments: 128,
    },
  },
}

export const HighScore: Story = {
  args: {
    article: {
      title: 'Trending Article with High Engagement',
      url: 'https://example.com',
      score: 1500,
      user: 'topcontributor',
      age: '1 hour ago',
      comments: 500,
    },
  },
}
