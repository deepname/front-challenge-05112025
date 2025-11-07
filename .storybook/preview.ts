import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import '../assets/main.scss'

// Setup Pinia for stories that need it
const pinia = createPinia()
setup((app) => {
  app.use(pinia)
  
  // Mock NuxtLink as a simple anchor
  app.component('NuxtLink', {
    props: ['to'],
    template: '<a :href="to"><slot /></a>',
  })
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
