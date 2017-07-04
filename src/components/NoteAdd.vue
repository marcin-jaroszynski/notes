<template>
  <article>
    <title-page title="Note add section"></title-page>
    <layout>
      <div slot="menu">
        <button @click="backToCategory()">Back to category: {{ getCategoryName() }}</button>
        <button @click="backToDashboard()">Back to Dashboard</button>
      </div>
      <div slot="content">
        <div>Category: {{ getCategoryName() }}</div>
        <div>
          <label for="note-title">Title:</label>
          <input v-model.trim="titleField" id="note-title" type="text"> 
        </div>
        <div>
          <label for="note-tag">Tag:</label>
          <input v-model.trim="tagField" id="note-tag" type="text">
          <button @click="addTag">Add</button>
          <div>
            List of tags:  
            <ul>
              <li is="tag-item" v-for="tag in getTagList()" v-bind:item="tag" v-bind:key="tag" @remove="removeTag"></li>
            </ul>
          </div>
        </div>
        <div>
          <div><label for="note-content">Content:</label></div>
          <textarea v-model="contentField" id="note-content"></textarea>
          <div>
            <button @click="addNote">Add</button>
          </div>
        </div>
      </div>
    </layout>
  </article>
</template>

<script>
  import Layout from './Layout'
  import Note from '../model/note/note.js'

  export default {
    name: 'note-add',
    props: ['categoryStorage'],
    components: {
      layout: Layout
    },
    data() {
      return {
        note: new Note(),
        titleField: '',
        tagField: '',
        contentField: ''
      }
    },
    methods: {
      getTagList: function() {
        return this.note.getTags();
      },
      getCurrentCategoryId: function() {
        return this.$route.params.categoryId;
      },
      backToDashboard: function() {
        this.$router.push('/dashboard');
      },
      backToCategory: function() {
        this.$router.push('/category/show/' + this.getCurrentCategoryId());
      },
      getCategoryName: function() {
        return this.categoryStorage.getTitleFor(this.getCurrentCategoryId());
      },
      addTag: function() {
        console.log('Add tag: ' + this.tagField);
        this.note.addTag(this.tagField);
        this.tagField = '';
      },
      removeTag: function(event) {
        console.log('Remove tag! value: ' + event.target.dataset.title);
        this.note.removeTag(event.target.dataset.title);
      },
      addNote: function() {
        console.log('Add note!');
        this.note.setTitle(this.titleField);
        this.note.setContent(this.contentField);
        console.log('Note title: '+ this.note.getTitle());
        console.log('Note content: '+ this.note.getContent());
        this.categoryStorage.addNoteFor(this.getCurrentCategoryId(), this.note);
      }
    }
  }
</script>