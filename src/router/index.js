import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import CategoryShow from '@/components/CategoryShow'
import CategoryAdd from '@/components/CategoryAdd'
import NoteAdd from '@/components/NoteAdd'
import NoteShow from '@/components/NoteShow'
import NoteEdit from '@/components/NoteEdit'

Vue.use(Router)

import CategoryStorage from '../model/category/storage.js'
let categoryStorage = new CategoryStorage();
import Url from '../model/url.js'

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
      path: Url.getLogin(),
      name: 'Login',
      title: 'Login',
      component: Login
    },
    {
      path: Url.getDashboard(),
      name: 'Dashboard',
      title: 'Dashboard',
      component: Dashboard,
      props: {
        categoryStorage: categoryStorage
      }
    },
    {
      path: Url.getCategoryShow(':categoryId/'),
      name: 'CategoryShow',
      component: CategoryShow,
      props: {
        categoryStorage: categoryStorage
      }
    },
    {
      path: Url.getCategoryAdd(),
      name: 'CategoryAdd',
      component: CategoryAdd,
      props: {
        categoryStorage: categoryStorage
      }
    },
    {
      path: Url.getNoteAdd(':categoryId/'),
      name: 'NoteAdd',
      component: NoteAdd,
      props: {
        categoryStorage: categoryStorage
      }
    },
    {
      path: Url.getNoteShow(':noteId/'),
      name: 'NoteShow',
      component: NoteShow,
      props: {
        categoryStorage: categoryStorage
      }
    },
    {
      path: Url.getNoteEdit(':noteId/'),
      name: 'NoteEdit',
      component: NoteEdit,
      props: {
        categoryStorage: categoryStorage
      }
    }
  ]
});
