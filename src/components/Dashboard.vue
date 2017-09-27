<template> 
  <article>
    <title-page title="Dashboard"></title-page>
    <layout>
      <div slot="menu">
        <side-menu title="Categories" v-bind:items="categories()"></side-menu>
        <li><button @click="getCategoryAddUrl()">Add category</button></li>
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
              <tr v-for="entry in getDashboardEntries">
                <td><router-link :to="entry.noteUrl">{{ entry.noteTitle }}</router-link></td>
                <td><router-link :to="entry.categoryUrl">{{ entry.categoryTitle }}</router-link></td>
                <td>{{ entry.noteDateAdded }}</td>
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
  import Url from '../model/url.js'

  export default {
    props: ['storage'],
    name: 'dashboard',
    components: {
      layout: Layout
    },
    data() {
      return {
        dashboardEntries: this.storage.dashboard.get(),
      }
    },
    computed: {
      getDashboardEntries() {
        return this.dashboardEntries.slice().reverse();
      }     
    },
    methods: {
      categories: function() {
        return this.storage.categories.getAll();
      },
      getCategoryAddUrl() {
        this.$router.push(Url.getCategoryAdd());
      }
    }
  }
</script>