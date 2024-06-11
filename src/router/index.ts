import { createWebHistory, createRouter } from 'vue-router'

import { h } from 'vue'
import Home from '../pages/home/index.vue'
import Admin from '../pages/admin/index.vue'

const routes = [
  { path: '/', redirect: '/admin' },
  { path: '/home', component: Home },
  { path: '/admin', component: Admin },
  { path: '/:catchAll(.*)', component: () => h('span', "什么都没找到0_0") },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;