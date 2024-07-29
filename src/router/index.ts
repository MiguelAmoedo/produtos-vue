import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue'; 
import Super from '@/pages/Criar.vue';
import Register from '@/pages/Register.vue';
import Login from '@/pages/Login.vue';

const routes = [
  {
    path: '/produtos',
    name: 'Home',
    component: Home,
  },
  {
    path: '/criar',
    name: 'Super',
    component: Super,
  },
  {
    path: '/cadastro',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
