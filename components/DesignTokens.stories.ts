import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Design System/Design Tokens',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Colors: Story = {
  render: () => ({
    template: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h1 style="margin-bottom: 2rem; font-size: 2rem; font-weight: 700;">Color Palette</h1>
        
        <section style="margin-bottom: 3rem;">
          <h2 style="margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; color: #111827;">Text Colors</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #111827; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$text-color</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#111827</div>
            </div>
            
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #9ca3af; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$text-placeholder-color</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#9ca3af</div>
            </div>
            
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #2563eb; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$text-color-hover</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#2563eb</div>
            </div>
            
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #6b7280; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$text-info-color</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#6b7280</div>
            </div>
            
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #6b7280; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$text-page-color</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#6b7280</div>
            </div>
          </div>
        </section>

        <section style="margin-bottom: 3rem;">
          <h2 style="margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; color: #111827;">Interactive Colors</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #1d4ed8; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$hover-color</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#1d4ed8</div>
            </div>
          </div>
        </section>

        <section style="margin-bottom: 3rem;">
          <h2 style="margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; color: #111827;">Background Colors</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: white; border: 1px solid #e5e7eb; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$bone-color</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">white</div>
            </div>
            
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #f9fafb; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$news-card-background</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#f9fafb</div>
            </div>
            
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #fef3c7; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$background-color</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#fef3c7</div>
            </div>
          </div>
        </section>

        <section style="margin-bottom: 3rem;">
          <h2 style="margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; color: #111827;">Border & Separator Colors</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #e5e7eb; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$border-color</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#e5e7eb</div>
            </div>
            
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #d1d5db; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$separator</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#d1d5db</div>
            </div>
          </div>
        </section>

        <section style="margin-bottom: 3rem;">
          <h2 style="margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; color: #111827;">Favorite Colors</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #fbbf24; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$favorite-border-color_1</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#fbbf24</div>
            </div>
            
            <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="width: 100%; height: 80px; background-color: #f59e0b; border-radius: 0.375rem; margin-bottom: 0.75rem;"></div>
              <div style="font-weight: 600; margin-bottom: 0.25rem;">$favorite-border-color_2</div>
              <div style="font-size: 0.875rem; color: #6b7280; font-family: monospace;">#f59e0b</div>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
}

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
}

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
}
