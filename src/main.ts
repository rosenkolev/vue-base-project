import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import { primeVueOptions } from './theme'
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue, primeVueOptions)
app.mount('#app')
