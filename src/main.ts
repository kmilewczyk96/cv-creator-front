import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// Quasar Framework
import {Loading, QSpinnerCube, Quasar} from 'quasar';
// Import icon/font and base styles
import quasarIconSet from "quasar/icon-set/material-icons";
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
// Pinia Store
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// Vue Router object:
import router from "@/router.ts";


const app = createApp(App).use(router);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Plugins:
app.use(pinia);
app.use(Quasar, {
  config: {
    brand: {
      primary: "#228be6",
      secondary: "#a5d8ff",
      accent: "#e64980",
      dark: "#212529",
      "dark-page": "#343a40",
      positive: "#12b886",
      negative: "#fa5252",
      info: "#868e96",
      warning: "#ffd43b",
    },
    loading: {
      backgroundColor: "dark",
      boxClass: "globalLoadingBg text-xl",
      spinner: QSpinnerCube,
      spinnerColor: "primary",
      spinnerSize: 128,
    }
  },
  iconSet: quasarIconSet,
  plugins: {
    Loading,
  },
});

app.mount('#app');
