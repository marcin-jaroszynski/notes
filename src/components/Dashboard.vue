<template>
  <article>
    <title-page title="Dashboard"></title-page>
    <layout>
      <div slot="menu">
        <side-menu title="Categories" v-bind:items="categories()"></side-menu>
      </div>
      <div slot="content">
        <div>Dashboard</div>
        <p>
          <div>Latest entries:</div>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>Category</td>
                <td>Date added</td>
              </tr>
              <tr v-for="entry in entries">
                <td><router-link :to="entry.note_url">{{ entry.title }}</router-link></td>
                <td><router-link :to="entry.category_url">{{ entry.category }}</router-link></td>
                <td>{{ entry.date_added }}</td>
              </tr>
            </tbody>
          </table>
        </p>
      </div>
    </layout>
  </article>
</template>

<script>
  import Layout from './Layout'
  import CategoryModel from '../model/category.js'
  export default {
    name: 'dashboard',
    components: {
      layout: Layout
    },
    data() {
      return {
        entries: [
          { title: 'Entry 1', category: 'CSS', note_url: '/note/show/1', category_url: '/category/show/css', date_added:'26.05.2017 22:36:56' },
          { title: 'Entry 2', category: 'MySQL', note_url: '/note/show/2', category_url: '/category/show/mysql', date_added:'26.05.2017 22:36:56' },
          { title: 'Entry 3', category: 'PHP', note_url: '/note/show/3', category_url: '/category/show/php', date_added:'26.05.2017 22:36:56' },
          { title: 'Entry 4', category: 'HTML 5', note_url: '/note/show/4', category_url: '/category/show/html5', date_added:'26.05.2017 22:36:56' },
          { title: 'Entry 5', category: 'JavaScript', note_url: '/note/show/5', category_url: '/category/show/javascript', date_added:'26.05.2017 22:36:56' },
        ]
      }
    },
    methods: {
      categories: function() {
        let categoriesList = CategoryModel.getList();
        categoriesList.push({ title: 'Add category', url: '/category/add' });
        return categoriesList;
      }
    }
  }
</script>