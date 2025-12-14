import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Quasar Framework
import { Quasar } from 'quasar'
// Import icon/font and base styles
import quasarIconSet from "quasar/icon-set/material-icons"
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
// Pinia Store
import { createPinia } from 'pinia'

const app = createApp(App)

// Install Pinia
app.use(createPinia())

// Install Quasar
app.use(Quasar, {
    config: {
      brand: {
        primary: "#228be6",
        secondary: "#a5d8ff",
        accent: "#fd7e14",
        dark: "#212529",
        "dark-page": "#343a40",
        positive: "#12b886",
        negative: "#fa5252",
        info: "#868e96",
        warning: "#ffd43b",
      },
    },
    iconSet: quasarIconSet,
    plugins: {
      // Add Quasar plugins here when needed, e.g., Dialog, Notify
    },
  })

app.mount('#app')
