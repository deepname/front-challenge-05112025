import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, defineComponent, h } from 'vue';
import type { NewsArticle } from '~/types/news';
import ArticleCard from './ArticleCard.vue';

const ArticleCardPreview = defineComponent({
  name: 'ArticleCardPreview',
  props: {
    title: { type: String, required: true },
    url: { type: String, required: true },
    score: { type: Number, required: true },
    user: { type: String, required: true },
    age: { type: String, required: true },
    comments: { type: Number, required: true },
  },
  setup(props) {
    const article = computed<NewsArticle>(() => ({
      title: props.title,
      url: props.url,
      score: props.score,
      user: props.user,
      age: props.age,
      comments: props.comments,
    }));

    return () => h(ArticleCard, { article: article.value });
  },
});

const meta = {
  title: 'Organisms/ArticleCard',
  component: ArticleCardPreview,
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
} satisfies Meta<typeof ArticleCardPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    title:
      'This is a very long article title that demonstrates how the card handles longer content and wraps appropriately',
    url: 'https://example.com',
    score: 250,
    user: 'janedoe',
    age: '5 hours ago',
    comments: 128,
  },
};

export const HighScore: Story = {
  args: {
    title: 'Trending Article with High Engagement',
    url: 'https://example.com',
    score: 1500,
    user: 'topcontributor',
    age: '1 hour ago',
    comments: 500,
  },
};
