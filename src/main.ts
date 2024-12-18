import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from "../src/plugins/vuetify"; // Vuetify plugin
import 'vuetify/dist/vuetify.min.css';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify);


app.mount('#app')
