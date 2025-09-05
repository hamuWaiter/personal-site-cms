import { h } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import FrontEnd from '../frontend/index.vue';
import Admin from '../cms/index.vue';
import { Home } from '../frontend/pages';
import { Blog, BlogEdit } from '../pages';
import { Blogs, Sites } from '../cms/pages';

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
    ]
  },

  // 博客内容页
  {
    path: '/blog/:id',
    component: Blog
  },
  {
    path: '/blog/:id/edit',
    component: BlogEdit
  },

  // 管理端系列页面
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: 'site',
        component: Sites
      },
      {
        path: 'blogs',
        component: Blogs
      },
    ]
  },
  { path: '/:catchAll(.*)', component: h('span', "什么都没找到0_0") },
]

const router = createRouter({
  history: createWebHistory(),
  // @ts-ignore
  routes,
})

export default router;