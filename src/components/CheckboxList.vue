<template>
  <div class="checkbox-list">
    <div v-for="option in options" :key="option.value" class="checkbox-item">
      <Checkbox v-model="value" :inputId="`cb-${option.value}`" :value="option.value" />
      <label :for="`cb-${option.value}`">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Checkbox from 'primevue/checkbox'

type Option = {
  label: string
  value: string | number
}

const props = defineProps<{
  /** The options. */
  options: Option[]
  /** The selected checkbox values. */
  modelValue: Array<string | number>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<string | number>): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<style scoped>
.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
