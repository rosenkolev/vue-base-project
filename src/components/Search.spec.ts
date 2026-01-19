import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Search from './Search.vue'

describe('Search', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(Search)
    const input = wrapper.find('.search-input')
    expect(input).toBeDefined()
  })
})
