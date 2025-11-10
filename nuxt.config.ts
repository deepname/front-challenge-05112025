const apiTarget = process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/test-utils'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  typescript: {
    strict: true,
    shim: false,
  },
  imports: {
    dirs: ['stores'],
  },
  runtimeConfig: {
    public: {
      apiUrl: apiTarget,
    },
  },
  app: {
    head: {
      title: 'News Browser',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },
  nitro: {
    routeRules: {
      'api/**': { proxy: `${apiTarget}/**` },
      'api/search/**': { proxy: `${apiTarget}/search/**` },
    },
  },
});
