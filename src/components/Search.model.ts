import { ref } from 'vue'
export interface SearchItem {
  id: string | number
  label: string
}

export class SearchItemMemoryStore {
  readonly items = ref([] as SearchItem[])
  constructor(private readonly initialItems: SearchItem[]) {}

  search(term: string) {
    this.items.value = !term ? [] : this.initialItems.filter((it) => it.label.startsWith(term))
  }

  clear() {
    this.items.value = []
  }
}
