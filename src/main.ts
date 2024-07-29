import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'; 

const app = createApp(App);

createApp(App).use(router).mount('#app');