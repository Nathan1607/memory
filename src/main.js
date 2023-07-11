import { createApp } from 'vue';
import App from './App.vue';
import MemoryGame from './components/MemoryGame.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const app = createApp(App);
app.component('MemoryGame', MemoryGame);
app.mount('#app');
