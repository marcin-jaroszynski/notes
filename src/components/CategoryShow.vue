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
          Number of entries: {{ getCategoryCountNotes() }}
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
        notesList: []
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.setNewsetEntries(to.params.categoryId);
      next();
    },
    async created() {
      this.setNewsetEntries(this.getCurrentCategoryId());
    },
    methods: {
      setNewsetEntries: async function(categoryId) {
        try {
          let data = await this.$http.get('category/get-notes', { category: categoryId });
          this.notesList = data.notes;
        } catch (error) {
        }
      },
      getCategoryCountNotes: function() {
        return this.notesList.length;
      },
      getCategoryNotes: function() {
        console.log('getCategoryNotes');
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