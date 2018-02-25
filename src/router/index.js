import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import CategoryShow from '@/components/CategoryShow'
import CategoryAdd from '@/components/CategoryAdd'
import NoteAdd from '@/components/NoteAdd'
import NoteShow from '@/components/NoteShow'
import NoteEdit from '@/components/NoteEdit'
import TagsResult from '@/components/TagsResult'

Vue.use(Router)

import Storage from '../model/storage/storage.js'
let storage = new Storage();
import Url from '../model/url.js'

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Login',
      title: 'Login',
      component: Login,
      props: {
        storage: storage
      }
      
    },
    {
      path: Url.getLogin(),
      name: 'Login',
      title: 'Login',
      component: Login,
      props: {
        storage: storage
      }
    },
    {
      path: Url.getDashboard(),
      name: 'Dashboard',
      title: 'Dashboard',
      component: Dashboard,
      props: {
        storage: storage
      }
    },
    {
      path: Url.getDashboardPage(':page(\\d+)'),
      name: 'DashboardPage',
      title: 'Dashboard',
      component: Dashboard,
      props: {
        storage: storage
      }
    },
    {
      path: Url.getCategoryShow(':categoryId/'),
      name: 'CategoryShow',
      component: CategoryShow,
      props: {
        storage: storage
      }
    },
    {
      path: Url.getCategoryShowPage(':categoryId', ':page(\\d+)'),
      name: 'CategoryShow',
      component: CategoryShow,
      props: {
        storage: storage
      }
    },
    {
      path: Url.getCategoryAdd(),
      name: 'CategoryAdd',
      component: CategoryAdd,
      props: {
        storage: storage
      }
    },
    {
      path: Url.getNoteAdd(':categoryId/'),
      name: 'NoteAdd',
      component: NoteAdd,
      props: {
        storage: storage
      }
    },
    {
      path: Url.getNoteShow(':noteId/'),
      name: 'NoteShow',
      component: NoteShow,
      props: {
        storage: storage
      }
    },
    {
      path: Url.getNoteEdit(':noteId/'),
      name: 'NoteEdit',
      component: NoteEdit,
      props: {
        storage: storage
      }
    },
    {
      path: Url.getTagsResult(':tagCode/'),
      name: 'TagsResult',
      component: TagsResult,
      props: {
        storage: storage
      }
    }
  ]
});
