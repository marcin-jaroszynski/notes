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
          <pagination :currentPage="getCurrentPage" :numOfAllEntries="getNumOfAllEntries" :offset="getPaginationOffset" :numEntriesPerPage="getNumEntriesPerPage" url="/dashboard/page/"></pagination>
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
    beforeRouteEnter (to, from, next) {
      next(vm => vm.setDashboard(to.params.page));
    },
    beforeRouteUpdate (to, from, next) {
      this.currentPage = parseInt(to.params.page);
      this.setDashboard(this.currentPage);
      next();
    },
    data() {
      return {
        dashboardEntries: [],
        currentPage: 1,
        numOfAllEntries: 0
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
      },
      getNumOfAllEntries() {
        return this.numOfAllEntries;
      },
      getPaginationOffset() {
        return 3;
      },
      getNumEntriesPerPage() {
        return 2;
      }    
    },
    methods: {
      getCategoryAddUrl() {
        this.$router.push(Url.getCategoryAdd());
      },
      setNumOfAllEntries(entries) {
        this.numOfAllEntries = entries;
      },
      setDashboard: async function(page) {
        if (page) {
          this.currentPage = page;
        }

        this.storage.dashboard.reset();
        let categoriesMap = new Map();
        let categories = this.storage.categories.getAll();
        for (let i = 0; i < categories.length; i++) {
          categoriesMap.set(categories[i].getCode(), categories[i]);
        }
        let response = await this.$http.get('dashboard/get', { currentPage: this.currentPage, numEntriesPerPage: this.getNumEntriesPerPage });
        this.setNumOfAllEntries(response.numOfAllEntries);
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
      }
    }
  }
</script>