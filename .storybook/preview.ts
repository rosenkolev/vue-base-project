import type { Preview } from '@storybook/vue3-vite'
import { setTheme, themes } from '@/composables/withTheme'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
  decorators: [
    (story, context) => {
      const backgroundName: string = context.globals?.backgrounds?.value
      setTheme(themes[backgroundName.toLowerCase()])
      return {
        components: { story },
        template: '<story />',
      }
    },
  ],
}

export default preview
