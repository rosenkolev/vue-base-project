<template>
  <h1>Test UI</h1>
  <h3>Custom Components</h3>
  <div>
    <b>Custom Buttons</b>
    <p>
      <Button label="Primary Button" />&nbsp;<Button label="Secondary Button" :primary="false" />
    </p>
    <b>Custom Search</b>
    <p>
      <Search :items :placeholder="'Search by typing New'" @search="searchStore.search($event)" />
    </p>
  </div>
  <h3>PrimeVue Components</h3>
  <div>
    <b>Checkbox List</b>
    <p><CheckboxList v-model="selected" :options="options" /></p>
  </div>
  <h3>Theme</h3>
  <span>
    <input
      id="themeLight"
      type="radio"
      name="theme"
      value="light"
      @change="onThemeChange($event)"
    />&nbsp; <label for="themeLight">Light</label> </span
  >&nbsp;&nbsp;
  <span>
    <input
      id="themeDark"
      type="radio"
      name="theme"
      value="dark"
      @change="onThemeChange($event)"
    />&nbsp;
    <label for="themeDark">Dark</label>
  </span>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import Button from './components/Button.vue'
import Search from './components/Search.vue'
import { SearchItemMemoryStore } from './components/Search.model'
import CheckboxList from './components/CheckboxList.vue'
import { setDarkMode } from './theme'

const searchStore = new SearchItemMemoryStore([
  { id: 1, label: 'New York' },
  { id: 2, label: 'Paris' },
  { id: 3, label: 'London' },
])
const options = [
  { label: 'Apples', value: 'apples' },
  { label: 'Bananas', value: 'bananas' },
  { label: 'Oranges', value: 'oranges' },
]
const items = searchStore.items
const selected = ref<Array<string>>([])
const onThemeChange = (e: Event) => {
  const theme = (e.target as HTMLInputElement).value
  setDarkMode(theme === 'dark')
}
</script>
