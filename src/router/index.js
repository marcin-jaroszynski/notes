import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import CategoryShow from '@/components/CategoryShow'
import CategoryAdd from '@/components/CategoryAdd'
import NoteAdd from '@/components/NoteAdd'

Vue.use(Router)

import CategoryStorage from '../model/category/storage.js'
let categoryStorage = new CategoryStorage();

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Login',
      title: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      title: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      title: 'Dashboard',
      component: Dashboard,
      props: {
        categoryStorage: categoryStorage
      }
    },
    {
      path: '/category/show/:categoryId/',
      name: 'CategoryShow',
      component: CategoryShow,
      props: {
        categoryStorage: categoryStorage
      }
    },
    {
      path: '/category/add/',
      name: 'CategoryAdd',
      component: CategoryAdd,
      props: {
        categoryStorage: categoryStorage
      }
    },
    {
      path: '/note/add/:categoryId/',
      name: 'NoteAdd',
      component: NoteAdd,
      props: {
        categoryStorage: categoryStorage
      }
    }
  ]
});
