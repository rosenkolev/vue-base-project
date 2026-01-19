<template>
  <h1>Vue Components!</h1>
  <div>
    <p><Button label="Primary Button" /></p>
    <p><Search :items @search="searchStore.search($event)" /></p>
  </div>
</template>
<script setup lang="ts">
import Button from './components/Button.vue'
import Search from './components/Search.vue'
import { SearchItemMemoryStore } from './components/Search.model'

const searchStore = new SearchItemMemoryStore([
  { id: 1, label: 'New York' },
  { id: 2, label: 'Paris' },
  { id: 3, label: 'London' },
])
const items = searchStore.items
</script>
