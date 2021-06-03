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
    path: '/navigation',
    name: 'MobileNavigation',
    component: () => import(/* webpackChunkName: "projects" */ '../views/MobileNavigation.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue'),
  },
  {
    path: '/projects/create',
    name: 'CreateProject',
    component: () => import(/* webpackChunkName: "projects" */ '../views/CreateProject.vue'),
  },
  {
    path: '/projects/:projectID',
    name: 'EditProject',
    props: { editMode: true },
    component: () => import(/* webpackChunkName: "projects" */ '../views/CreateProject.vue'),
  },

  {
    path: '/projects/:projectID/palletes/create',
    name: 'CreatePallete',
    component: () => import(/* webpackChunkName: "projects" */ '../views/CreatePallete.vue'),
  },
  {
    path: '/projects/:projectID/palletes/:palleteID',
    name: 'EditPallete',
    props: { editMode: true },
    component: () => import(/* webpackChunkName: "projects" */ '../views/CreatePallete.vue'),
  },
  {
    path: '/generator',
    name: 'Generator',
    component: () => import(/* webpackChunkName: "generator" */ '../views/Generator.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
