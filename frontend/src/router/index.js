import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth/:magicToken?',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue'),
  },
  {
    path: '/colors',
    name: 'Colors',
    component: () => import(/* webpackChunkName: "colors" */ '../views/Colors.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
