import type { Ref } from 'vue'
import { ref } from 'vue'

export type Theme = {
  __name__: string
  primary: {
    backgroundColor: string
    textColor: string
    borderColor: string
    borderFocusColor: string
    borderRadius: string
  }
}

export const themes = {
  light: {
    __name__: 'light',
    primary: {
      backgroundColor: '#fcf9f9',
      textColor: '#142244',
      borderColor: '#8d97a1',
      borderFocusColor: '#61beec',
      borderRadius: '6px',
    },
  } satisfies Theme,
  dark: {
    __name__: 'dark',
    primary: {
      backgroundColor: '#444',
      textColor: '#fff',
      borderColor: '#222',
      borderFocusColor: '#333',
      borderRadius: '6px',
    },
  } satisfies Theme,
}

const globalTheme = ref(themes.light)

export function setTheme(theme: Theme) {
  globalTheme.value = theme
}

export function withTheme() {
  return { theme: globalTheme }
}
