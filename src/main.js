import { createApp } from 'vue'
import App from './App.vue'
import NaiveUi from "naive-ui";
import Router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App)
    .use(NaiveUi)
    .use(Router)
    .mount('#app')
