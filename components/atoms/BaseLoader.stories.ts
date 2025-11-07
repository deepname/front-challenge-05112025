import type { Meta, StoryObj } from '@storybook/vue3';
import BaseLoader from './BaseLoader.vue';

const meta = {
  title: 'Atoms/BaseLoader',
  component: BaseLoader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A loading spinner component with animated circular progress indicator.',
      },
    },
  },
} satisfies Meta<typeof BaseLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { BaseLoader },
    template: `
      <div style="padding: 2rem; text-align: center;">
        <h3 style="margin-bottom: 1rem; color: #111827;">
          Loading... 
          <div style="display: inline-flex; align-items: center; gap: 1rem;">
            <BaseLoader />
          </div>
        </h3>
      </div>
    `,
  }),
};

export const InCard: Story = {
  render: () => ({
    components: { BaseLoader },
    template: `
      <div style="padding: 2rem; background-color: #f9fafb; border-radius: 0.5rem; border: 1px solid #e5e7eb;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <BaseLoader />
          <div>
            <h4 style="margin: 0; color: #111827;">Processing your request</h4>
            <p style="margin: 0.25rem 0 0 0; color: #6b7280; font-size: 0.875rem;">Please wait while we load your data...</p>
          </div>
        </div>
      </div>
    `,
  }),
};
