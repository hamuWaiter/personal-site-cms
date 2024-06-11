import { h } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import { Home } from '../pages';
import { SiteList, SiteModify } from '../cms';

const routes = [
  { path: '/', redirect: '/admin' },
  { path: '/home', component: Home },
  { path: '/admin/site', component: SiteList },
  { path: '/admin/site/add', component: SiteModify },
  { path: '/admin/site/:id', component: SiteModify },
  { path: '/:catchAll(.*)', component: () => h('span', "什么都没找到0_0") },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;