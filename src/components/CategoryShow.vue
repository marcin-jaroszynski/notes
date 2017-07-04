<template>
  <article>
    <title-page title="Category section"></title-page>
    <layout>
      <div slot="menu">
        <side-menu title="Categories" v-bind:items="categories"></side-menu>
        <button @click="backToDashboard()">Back to Dashboard</button>
      </div>
      <div slot="content">
        <div>Category: {{ getCategoryName(getCurrentCategoryId()) }}</div>
        <div>
          Number of entries: {{ countEntriesCategory }}
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
              <tr v-for="entry in getCategoryNotes(getCurrentCategoryId())">
                <td><a :href="entry.url">{{ entry.title }}</a></td>
                <td>{{ entry.dateAdded }}</td>
              </tr>
            </tbody>
          </table>
          <div>
          Tags: <a v-for="tag in tags" :href="tag.url">{{ tag.title }} </a>
          </div>
        </p>
      </div>
    </layout>
  </article>
</template>

<script>
  import Layout from './Layout'
  export default {
    props: ['categoryStorage'],
    name: 'category-show', 
    components: {
      layout: Layout
    },
    data() {
      return {
        countEntriesCategory: 25,
        categories: this.categoryStorage.getList(),
        tags: [
          { title: 'Tag 1', url: '/tags/tag1' },
          { title: 'Tag 2', url: '/tags/tag2' },
          { title: 'Tag 3', url: '/tags/tag3' },
          { title: 'Tag 4', url: '/tags/tag4' },
        ]
      }
    },
    methods: {
      getCategoryNotes: function(categoryId) {
        console.log('categoryId: ' + categoryId);
        let notes = this.categoryStorage.getNotesFor(categoryId);
        console.log('notes: ' + JSON.stringify(notes));
        return notes;
      },
      getCurrentCategoryId: function() {
        return this.$route.params.categoryId;
      },
      backToDashboard: function() {
        this.$router.push('/dashboard');
      },
      getCategoryName: function(categoryId) {
        return this.categoryStorage.getTitleFor(categoryId);
      },
      addNewNote: function() {
        this.$router.push('/note/add/' + this.getCurrentCategoryId());
      }
    }
  }
</script>