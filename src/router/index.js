import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import CategoryShow from '@/components/CategoryShow'
import CategoryAdd from '@/components/CategoryAdd'

Vue.use(Router)

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
      component: Dashboard
    },
    {
      path: '/category/show/:categoryId/',
      name: 'CategoryShow',
      component: CategoryShow,
      props: true
    },
    {
      path: '/category/add/',
      name: 'CategoryAdd',
      component: CategoryAdd
    }
  ]
});
