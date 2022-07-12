import { createApp } from 'vue'
import App from './App.vue'
import style from './assets/style.scss'

const myapp =  createApp(App);
myapp.use(style);
myapp.mount('#app');