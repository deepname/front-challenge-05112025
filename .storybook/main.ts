import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          '~': path.resolve(__dirname, '..'),
          '@': path.resolve(__dirname, '..'),
        },
      },
    });
  },
};

export default config;
