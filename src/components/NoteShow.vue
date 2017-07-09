<template>
  <article>
    <title-page title="Note display section"></title-page>
    <layout>
      <div slot="menu">
        <button @click="backToCategory()">Back to category: {{ getTitleCategory() }}</button>
        <button @click="backToDashboard()">Back to Dashboard</button>
      </div>
      <div slot="content">
        <div><button @click="goToNoteEdit()">Edit</button></div>
        <div>Note: {{ note.getTitle() }}</div>
        <div>Category: {{ getTitleCategory() }}</div>
        <div>
          Date added: {{ note.getDateAdded() }}
        </div>
        <div>
          Tags: <span v-for="tag in note.getTags()"><router-link :to="tag.url">{{ tag.title }} </router-link></span>
        </div>
        <p>
          {{ note.getContent() }}
        </p>
      </div>
    </layout>
  </article>
</template>

<script>
  import Layout from './Layout'
  import Url from '../model/url.js'
  
  export default {
    props: ['categoryStorage'],
    name: 'note-show', 
    components: {
      layout: Layout
    },
    data() {
      return {
        note: this.getNote()
      }
    },
    methods: {
      getNoteId: function() {
        return this.$route.params.noteId;
      },
      backToDashboard: function() {
        this.$router.push(Url.getDashboard());
      },
      getNote: function() {
        return this.categoryStorage.getNoteFor(this.getNoteId());
      },
      getTitleCategory: function() {
        return this.categoryStorage.getTitleFor(this.note.getCategoryId());
      },
      backToCategory: function() {
        this.$router.push(Url.getCategoryShow(this.note.getCategoryId()));
      },
      goToNoteEdit: function() {
        this.$router.push(Url.getNoteEdit(this.getNoteId()));
      }
    }
  }
</script>