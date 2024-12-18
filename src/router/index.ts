import { h } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import FrontEnd from '../frontend/index.vue';
import Admin from '../cms/index.vue';
import { Blog, Home } from '../frontend/pages';
import { BlogList, BlogModify, SiteList, SiteModify } from '../cms/pages';

const routes = [
  // 前端系列页面
  {
    path: '/',
    component: FrontEnd,
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'blog',
        component: Blog
      }
    ]
  },


  // 管理端系列页面
  {
    path: '/admin',
    component: Admin,
    redirect: 'site',
    children: [
      {
        path: 'site',
        component: SiteList
      },
      {
        path: 'site/add',
        component: SiteModify
      },
      {
        path: 'site/:id',
        component: SiteModify
      },
      {
        path: 'blog',
        component: BlogList
      },
      {
        path: 'blog/add',
        component: BlogModify
      },
      {
        path: 'blog/:id',
        component: BlogModify
      },
    ]
  },
  { path: '/:catchAll(.*)', component: () => h('span', "什么都没找到0_0") },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;