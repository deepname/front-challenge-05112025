export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
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
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000',
    },
  },
  app: {
    head: {
      title: 'News Browser',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  nitro: {
    routeRules: {
      'api/*': { proxy: 'http://localhost:4000/*' },
      'api/search?text=*': { proxy: 'http://localhost:4000/search?text=*' } 
    }
  },
})