import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

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
      path: '/dashboard',
      name: 'Dashboard',
      title: 'Dashboard',
      component: Dashboard
    }
  ]
});
