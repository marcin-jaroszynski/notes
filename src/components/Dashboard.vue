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
          <pagination pages="7" :currentpage="getCurrentPage" url="/dashboard/page/"></pagination>
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
      console.log('Page: ' + JSON.stringify(this.$route.params));
      if (this.$route.params) {
        this.currentPage = this.$route.params.page;
      }

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
    beforeRouteUpdate (to, from, next) {
      console.log('beforeRouteUpdate.to: ' + JSON.stringify(to.params));
      this.currentPage = parseInt(to.params.page);
      next();
      // this.$router.push(Url.getDashboardPage(this.currentPage));
    },
    data() {
      return {
        dashboardEntries: [],
        currentPage: 1
      }
    },
    computed: {
      getDashboardEntries() {
        return this.dashboardEntries;
      },
      getCategories() {
        return this.storage.categories.getAll();
      },
      getCurrentPage() {
        return this.currentPage;
      }     
    },
    methods: {
      getCategoryAddUrl() {
        this.$router.push(Url.getCategoryAdd());
      }
    }
  }
</script>