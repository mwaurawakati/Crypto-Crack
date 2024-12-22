import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './index.css'
import 'primeicons/primeicons.css'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app')