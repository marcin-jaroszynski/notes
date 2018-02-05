<template> 
  <article>
    <title-page title="Dashboard"></title-page>
    <layout>
      <div slot="menu">
        <side-menu title="Categories" v-bind:items="getCategories"></side-menu>
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
  import Note from '../model/note/note.js'

  export default {
    props: ['storage'],
    name: 'dashboard',
    components: {
      layout: Layout
    },
    async created() {
      this.storage.dashboard.reset();
      let categoriesMap = new Map();
      let categories = this.storage.categories.getAll();
      for (let i = 0; i < categories.length; i++) {
        categoriesMap.set(categories[i].getCode(), categories[i]);
      }
      let response = await this.$http.get('dashboard/get');
      let dashboardEntries = response.entries;
      for (let i = 0; i < dashboardEntries.length; i++) {
        if (categoriesMap.has(dashboardEntries[i].category)) {
          let note = new Note();
          note.setId(dashboardEntries[i]._id);
          note.setTitle(dashboardEntries[i].title);
          note.setCategoryId(dashboardEntries[i].category);
          note.setDateAdded(dashboardEntries[i].created_date);
          let categoryNote = categoriesMap.get(dashboardEntries[i].category);
          this.storage.dashboard.add(note, categoryNote);
        }
      }
      this.dashboardEntries = this.storage.dashboard.get();
    },
    data() {
      return {
        dashboardEntries: [],
      }
    },
    computed: {
      getDashboardEntries() {
        return this.dashboardEntries;
      },
      getCategories() {
        return this.storage.categories.getAll();
      }     
    },
    methods: {
      getCategoryAddUrl() {
        this.$router.push(Url.getCategoryAdd());
      }
    }
  }
</script>