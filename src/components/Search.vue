<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="search">
    <input
      class="search-input"
      type="text"
      :placeholder="placeholder ?? 'Search...'"
      v-on-key="on.search"
      v-on-key-delay="delay"
      data-testid="searchInput"
    />

    <ul v-if="hasItems" class="search-results" data-testid="searchList">
      <li v-for="item in items" :key="item.id" class="search-item" @click="on.select(item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withTheme } from '@/composables/withTheme'
import { vOnKey, vOnKeyDelay } from '@/directives/onKey'

import type { SearchItem } from './Search.model'

const props = defineProps<{
  items: SearchItem[]
  placeholder?: string
  delay?: number
}>()

const emit = defineEmits<{
  (e: 'search', value: string): void
  (e: 'select', item: SearchItem): void
}>()

const { theme } = withTheme()
const hasItems = computed(() => props.items && props.items.length > 0)
const on = {
  search: (value: string) => emit('search', value),
  select: (item: SearchItem) => emit('select', item),
}
</script>

<style scoped>
.search {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  outline: none;
  font-size: 14px;

  background-color: v-bind('theme.primary.backgroundColor');
  color: v-bind('theme.primary.textColor');
  border: 1px solid v-bind('theme.primary.borderColor');
}

.search-input:focus {
  border-color: v-bind('theme.primary.borderFocusColor');
}

.search-results {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;

  background-color: #fff;
  border: 1px solid v-bind('theme.primary.borderColor');
  border-radius: 6px;

  list-style: none;
  margin: 0;
  padding: 4px 0;
  z-index: 10;
}

.search-item {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  color: v-bind('theme.primary.textColor');
}

.search-item:hover {
  background-color: v-bind('theme.primary.borderFocusColor');
  color: #fff;
}
</style>
