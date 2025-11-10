import { expect, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import PageHeader from './PageHeader.vue';

const meta = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'News Browser',
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const title = await canvas.findByRole('heading', { name: /news browser/i });

    expect(title).toBeVisible();
  },
};

export const WithActions: Story = {
  render: () => ({
    components: { PageHeader },
    template: `
      <PageHeader title="News Browser">
        <template #actions>
          <a href="/favorites" style="padding: 0.5rem 1rem; background: #2563eb; color: white; text-decoration: none; border-radius: 0.375rem;">
            Favorites (5)
          </a>
        </template>
      </PageHeader>
    `,
  }),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const actionsNav = await canvas.findByRole('navigation');

    expect(actionsNav).toBeVisible();
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a Very Long Page Title to Test How It Wraps',
  },
  async play({ canvasElement, args }) {
    const canvas = within(canvasElement);
    const heading = await canvas.findByRole('heading', {
      name: new RegExp((args?.title ?? '').slice(0, 10), 'i'),
    });

    expect(heading).toBeVisible();
  },
};
