import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';

createApp(App).use(Toast, { hideProgressBar: true, position: 'top-center' }).mount('#app');
