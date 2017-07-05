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
                <td><a :href="entry.url">{{ entry.title }}</a></td>
                <td>{{ entry.dateAdded }}</td>
              </tr>
            </tbody>
          </table>
          <div>
          Tags: <a v-for="tag in getCategoryTags()" :href="tag.url">{{ tag.title }} </a>
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
      getCategoryCountNotes: function() {
        return this.getCategoryNotes().length;
      },
      getCategoryNotes: function() {
        return this.categoryStorage.getNotesFor(this.getCurrentCategoryId());
      },
      getCategoryTags: function() {
        return this.categoryStorage.getTagsFor(this.getCurrentCategoryId());
      },
      getCurrentCategoryId: function() {
        return this.$route.params.categoryId;
      },
      backToDashboard: function() {
        this.$router.push('/dashboard');
      },
      getCategoryName: function() {
        return this.categoryStorage.getTitleFor(this.getCurrentCategoryId());
      },
      addNewNote: function() {
        this.$router.push('/note/add/' + this.getCurrentCategoryId());
      }
    }
  }
</script>