// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'off', // Let TypeScript handle this
      '@typescript-eslint/no-unused-vars': 'error',
    },
  }
)
