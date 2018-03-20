<template>
  <article>
    <title-page title="Category section"></title-page>
    <layout>
      <div slot="menu">
        <side-menu title="Categories" v-bind:items="categories"></side-menu>
        <button @click="backToDashboard()">Back to Dashboard</button>
      </div>
      <div slot="content">
        <div>Category: {{ getCategoryName() }}</div>
        <div>
          Number of entries: {{ getNumOfAllEntries }}
          <button  @click="addNewNote">Add new entry</button>
        </div>
        <p>
          <div>Latest entries:</div>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>Date added</td>
              </tr>
              <tr v-for="entry in getCategoryNotes()">
                <td><router-link :to="entry.url">{{ entry.title }}</router-link></td>
                <td>{{ entry.dateAdded }}</td>
              </tr>
            </tbody>
          </table>
          <div>
          Tags: <span v-for="tag in getCategoryTags()"><router-link :to="tag.url">{{ tag.title }}</router-link> </span>
          </div>
          <pagination :currentPage="getCurrentPage" :numOfAllEntries="getNumOfAllEntries" :offset="getPaginationOffset" :numEntriesPerPage="getNumEntriesPerPage" :url="getPaginationUrl"></pagination>
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
    name: 'category-show', 
    components: {
      layout: Layout
    },
    data() {
      return {
        categories: this.storage.categories.getAll(),
        notesList: [],
        currentPage: 1,
        numOfAllEntries: 0
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => vm.setNewsetEntries(to.params.categoryId, to.params.page));
    },
    beforeRouteUpdate(to, from, next) {
      this.setNewsetEntries(to.params.categoryId, to.params.page);
      next();
    },
    computed: {
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
        return 10;
      },
      getPaginationUrl() {
        return Url.getCategoryShow(this.getCurrentCategoryId()) + '/page/';
      }
    },
    methods: {
      setNewsetEntries: async function(categoryId, page) {
        this.currentPage = 1;
        if (page) {
          this.currentPage = page;
        }

        try {
          let requestParams = {
            category: categoryId,
            currentPage: this.currentPage,
            numEntriesPerPage: this.getNumEntriesPerPage
          };
          let data = await this.$http.get('category/get-notes', requestParams);
          this.notesList = data.notes;
          this.numOfAllEntries = data.numOfAllEntries;
        } catch (error) {
          this.$router.push(Url.getLogout());
        }
      },
      getCategoryNotes: function() {
        return this.notesList;
      },
      getCategoryTags: function() {
        return this.storage.categories.getTagsFor(this.getCurrentCategoryId());
      },
      getCurrentCategoryId: function() {
        return this.$route.params.categoryId;
      },
      backToDashboard: function() {
        this.$router.push(Url.getDashboard());
      },
      getCategoryName: function() {
        return this.storage.categories.getTitleFor(this.getCurrentCategoryId());
      },
      addNewNote: function() {
        this.$router.push(Url.getNoteAdd(this.getCurrentCategoryId()));
      }
    }
  }
</script>