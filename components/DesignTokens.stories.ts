import type { Meta, StoryObj } from '@storybook/vue3';

import { buildColorSwatchGroups } from './DesignTokens.helpers';

const meta = {
  title: 'Design System/Design Tokens',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => ({
    setup() {
      return {
        colorSwatchGroups: buildColorSwatchGroups(),
      };
    },
    template: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h1 style="margin-bottom: 2rem; font-size: 2rem; font-weight: 700;">Color Palette</h1>

        <section
          v-for="group in colorSwatchGroups"
          :key="group.categoryName"
          style="margin-bottom: 3rem;"
        >
          <h2 style="margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; color: #111827;">
            {{ group.categoryName }}
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
            <div
              v-for="swatch in group.swatches"
              :key="swatch.varName"
              style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;"
            >
              <div
                :style="{
                  width: '100%',
                  height: '80px',
                  backgroundColor: swatch.colorValue,
                  borderRadius: '0.375rem',
                  marginBottom: '0.75rem',
                  border: swatch.isWhite ? '1px solid #e5e7eb' : undefined,
                }"
              ></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">{{ '$' + swatch.varName }}</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">{{ swatch.colorValue }}</div>
              <div style="font-size: 0.75rem; color: #9ca3af; margin-top: 0.25rem;">{{ swatch.description }}</div>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
};

export const Typography: Story = {
  render: () => ({
    template: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px;">
        <h1 style="margin-bottom: 2rem; font-size: 2rem; font-weight: 700;">Typography</h1>
        
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
          <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; font-weight: 600;">Font Family</h2>
          <p style="margin: 0; font-family: monospace; color: #6b7280;">-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif</p>
        </div>

        <div style="padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
          <h2 style="margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600;">Scale Examples</h2>
          
          <div style="margin-bottom: 1.5rem;">
            <h1 style="margin: 0 0 0.5rem 0; font-size: 2rem; font-weight: 700; color: #111827;">Heading 1 - 2rem / 700</h1>
            <code style="font-size: 0.875rem; color: #6b7280;">font-size: 2rem; font-weight: 700;</code>
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; font-weight: 600; color: #111827;">Heading 2 - 1.5rem / 600</h2>
            <code style="font-size: 0.875rem; color: #6b7280;">font-size: 1.5rem; font-weight: 600;</code>
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600; color: #111827;">Heading 3 - 1.125rem / 600</h3>
            <code style="font-size: 0.875rem; color: #6b7280;">font-size: 1.125rem; font-weight: 600;</code>
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <p style="margin: 0 0 0.5rem 0; font-size: 1rem; color: #111827;">Body Text - 1rem / 400</p>
            <code style="font-size: 0.875rem; color: #6b7280;">font-size: 1rem; font-weight: 400;</code>
          </div>
          
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Small Text - 0.875rem / 400</p>
            <code style="font-size: 0.875rem; color: #6b7280;">font-size: 0.875rem; font-weight: 400;</code>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Spacing: Story = {
  render: () => ({
    template: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h1 style="margin-bottom: 2rem; font-size: 2rem; font-weight: 700;">Spacing Scale</h1>
        
        <div style="display: grid; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 100px; font-weight: 600; color: #6b7280;">0.25rem</div>
            <div style="height: 40px; width: 0.25rem; background: #2563eb;"></div>
            <code style="color: #6b7280;">4px</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 100px; font-weight: 600; color: #6b7280;">0.5rem</div>
            <div style="height: 40px; width: 0.5rem; background: #2563eb;"></div>
            <code style="color: #6b7280;">8px</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 100px; font-weight: 600; color: #6b7280;">0.75rem</div>
            <div style="height: 40px; width: 0.75rem; background: #2563eb;"></div>
            <code style="color: #6b7280;">12px</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 100px; font-weight: 600; color: #6b7280;">1rem</div>
            <div style="height: 40px; width: 1rem; background: #2563eb;"></div>
            <code style="color: #6b7280;">16px</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 100px; font-weight: 600; color: #6b7280;">1.25rem</div>
            <div style="height: 40px; width: 1.25rem; background: #2563eb;"></div>
            <code style="color: #6b7280;">20px</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 100px; font-weight: 600; color: #6b7280;">1.5rem</div>
            <div style="height: 40px; width: 1.5rem; background: #2563eb;"></div>
            <code style="color: #6b7280;">24px</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 100px; font-weight: 600; color: #6b7280;">2rem</div>
            <div style="height: 40px; width: 2rem; background: #2563eb;"></div>
            <code style="color: #6b7280;">32px</code>
          </div>
        </div>
      </div>
    `,
  }),
};
