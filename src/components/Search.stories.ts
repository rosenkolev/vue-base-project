import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { useArgs } from 'storybook/preview-api'
import { fn, expect } from 'storybook/test'

import { SearchItemMemoryStore } from './Search.model'
import Search from './Search.vue'

const defaultItems = [
  { id: 1, label: 'Vue' },
  { id: 2, label: 'React' },
  { id: 3, label: 'Svelte' },
]

const meta = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  decorators: [
    // expose updateArgs to be used in render
    (story, context) => {
      const [, updateArgs] = useArgs()
      return story({ ...context, updateArgs })
    },
  ],
  render: (args, { updateArgs }) => ({
    components: { Search },
    setup() {
      const store = new SearchItemMemoryStore(defaultItems)

      const onSearch = (item: string) => {
        store.search(item)
        updateArgs({ items: store.items.value })
      }

      return { args, items: store.items, onSearch }
    },
    template: '<Search v-bind="args" :items @search="onSearch" />',
  }),
  args: {
    items: [],
    onSelect: fn(),
    onSearch: fn(),
  },
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

const flushVue = async () => {
  await Promise.resolve() // microtasks
  await new Promise(requestAnimationFrame)
  await new Promise(requestAnimationFrame)
}

export const Test: Story = {
  args: {
    delay: 0,
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('searchInput'), 'Sve')

    await flushVue()
    // 👇 Assert DOM structure
    await expect(canvas.getByTestId('searchList')).toBeInTheDocument()
    await expect(canvas.getByText('Svelte')).toBeInTheDocument()
  },
}
