import { createApp } from 'vue'
import App from './App.vue'
import NaiveUi from "naive-ui";
import Router from "./router";

createApp(App)
    .use(NaiveUi)
    .use(Router)
    .mount('#app')
