import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/reports', name: 'Reports', component: () => import('../views/Reports.vue') },
  { path: '/settings', name: 'Settings', component: () => import('../views/Settings.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router