import type { DirectiveBinding } from 'vue'

type SearchHandler = (value: string, event: Event) => void

interface ElWithTimer extends HTMLInputElement {
  __searchTimer?: number
  __onSearchListener: (event: Event) => void
}

class IntegerStore {
  map = new WeakMap<HTMLElement, number>()
  get(el: HTMLElement, defaultValue: number) {
    return this.map.has(el) ? this.map.get(el) : defaultValue
  }

  set(el: HTMLElement, val: string | number | undefined) {
    if (typeof val !== 'undefined') {
      this.map.set(el, typeof val === 'string' ? parseInt(val) : val)
    }
  }
}

const store = new IntegerStore()
export const vOnKey = {
  mounted(el: ElWithTimer, binding: DirectiveBinding<SearchHandler>) {
    const handler = binding.value
    if (typeof handler !== 'function') {
      console.warn('v-on-key-delayed expects a function')
      return
    }

    const listener = (event: Event) => {
      window.clearTimeout(el.__searchTimer)

      const delay = store.get(el, 500)
      if (delay === 0) handler(el.value, event)
      else {
        el.__searchTimer = window.setTimeout(() => {
          handler(el.value, event)
        }, delay)
      }
    }

    el.addEventListener('keyup', listener)
    el.__onSearchListener = listener
  },

  unmounted(el: ElWithTimer) {
    window.clearTimeout(el.__searchTimer)
    el.removeEventListener('keyup', el.__onSearchListener)
  },
}

export const vOnKeyDelay = {
  mounted(el: ElWithTimer, binding: DirectiveBinding<number | string>) {
    store.set(el, binding.value)
  },
  updated(el: ElWithTimer, binding: DirectiveBinding<number | string>) {
    store.set(el, binding.value)
  },
}
