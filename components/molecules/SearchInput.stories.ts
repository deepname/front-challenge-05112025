import { expect, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import SearchInput from './SearchInput.vue';

const meta = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { SearchInput },
    setup() {
      const searchQuery = ref('');
      return { searchQuery };
    },
    template: '<SearchInput v-model="searchQuery" />',
  }),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole('textbox', { name: /search news/i });

    await userEvent.type(input, 'latest');

    expect(input).toHaveValue('latest');
  },
};

export const WithValue: Story = {
  render: () => ({
    components: { SearchInput },
    setup() {
      const searchQuery = ref('Vue.js');
      return { searchQuery };
    },
    template: '<SearchInput v-model="searchQuery" />',
  }),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole('textbox', { name: /search news/i });

    expect(input).toHaveValue('Vue.js');

    await userEvent.clear(input);
    await userEvent.type(input, 'Nuxt 4');

    expect(input).toHaveValue('Nuxt 4');
  },
};
