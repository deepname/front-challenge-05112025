import { vi } from 'vitest';

// Mock NuxtLink
vi.mock('#app', () => ({
  NuxtLink: {
    name: 'NuxtLink',
    props: ['to'],
    template: '<a :href="typeof to === \'string\' ? to : to?.name"><slot /></a>',
  },
  useRuntimeConfig: () => ({
    public: {
      apiUrl: 'http://localhost:4000',
    },
  }),
}));

// Mock Vue Router for RouterLink if needed
vi.mock('vue-router', () => ({
  RouterLink: {
    name: 'RouterLink',
    props: ['to'],
    template: '<a :href="to"><slot /></a>',
  },
}));

// Global test setup
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
