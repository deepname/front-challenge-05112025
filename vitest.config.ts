/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '.nuxt/',
        '.output/',
        '.vscode/',
        '.ia/',
        '.storybook/',
        'storybook/',
        'storybook-static/',
        'node_modules/',
        'types',
        'test/',
        'test-results/',
        'tests/',
        'stories/',
        'coverage/',
        'scripts/',
        'app.vue',
        '**/*.test.ts',
        '**/*.test.js',
        '**/*.config.ts',
        '**/*.config.js',
        '**/*.stories.ts',
        '**/*.spec.ts',
        '**/*.mjs',
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, '.'),
    },
  },
});
