import { expect, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import AppLayout from './AppLayout.vue';

const meta = {
  title: 'Templates/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { AppLayout },
    template: `
      <AppLayout>
        <template #header>
          <div style="padding: 1rem; border-bottom: 2px solid #e5e7eb;">
            <h1 style="margin: 0;">Page Header</h1>
          </div>
        </template>
        
        <div style="padding: 2rem;">
          <p>Main content goes here</p>
        </div>
      </AppLayout>
    `,
  }),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const heading = await canvas.findByRole('heading', { name: /page header/i });
    expect(heading).toBeVisible();
  },
};

export const WithSearch: Story = {
  render: () => ({
    components: { AppLayout },
    setup() {
      const query = ref('');
      return { query };
    },
    template: `
      <AppLayout>
        <template #header>
          <div style="padding: 1rem; border-bottom: 2px solid #e5e7eb;">
            <h1 style="margin: 0;">News Browser</h1>
          </div>
        </template>
        
        <template #search>
          <input 
            v-model="query" 
            type="search" 
            placeholder="Search news..." 
            style="width: 100%; padding: 0.75rem 1rem; border: 2px solid #e5e7eb; border-radius: 0.5rem;"
          />
        </template>
        
        <div style="padding: 2rem;">
          <p>Search results would appear here</p>
        </div>
      </AppLayout>
    `,
  }),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const searchBox = await canvas.findByRole('searchbox');

    expect(searchBox).toBeVisible();
  },
};

export const FullExample: Story = {
  render: () => ({
    components: { AppLayout },
    template: `
      <AppLayout>
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 2px solid #e5e7eb;">
            <h1 style="margin: 0;">News Browser</h1>
            <a href="#" style="padding: 0.5rem 1rem; background: #2563eb; color: white; text-decoration: none; border-radius: 0.375rem;">
              Favorites (3)
            </a>
          </div>
        </template>
        
        <template #search>
          <input 
            type="search" 
            placeholder="Search news..." 
            style="width: 100%; padding: 0.75rem 1rem; border: 2px solid #e5e7eb; border-radius: 0.5rem;"
          />
        </template>
        
        <div>
          <div style="padding: 1rem; border-bottom: 1px solid #e5e7eb;">
            <h3 style="margin: 0 0 0.5rem 0;">Article Title 1</h3>
            <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">100 points • by user1 • 2 hours ago</p>
          </div>
          <div style="padding: 1rem; border-bottom: 1px solid #e5e7eb;">
            <h3 style="margin: 0 0 0.5rem 0;">Article Title 2</h3>
            <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">250 points • by user2 • 5 hours ago</p>
          </div>
        </div>
      </AppLayout>
    `,
  }),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const favoritesLink = await canvas.findByRole('link', { name: /favorites \(3\)/i });

    expect(favoritesLink).toBeVisible();
  },
};
