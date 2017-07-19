<template>
  <article>
    <title-page title="Note edit section"></title-page>
    <layout>
      <div slot="menu">
        <button @click="backToNote()">Back to note</button>
        <button @click="backToCategory()">Back to category: {{ getCategoryName }}</button>
        <button @click="backToDashboard()">Back to Dashboard</button>
      </div>
      <div slot="content">
        <div>
          Categories
          <select v-model="currentCategory">
            <option v-for="category in categories" :value="category.code">{{ category.title }}</option>
          </select>
        </div>
        <div>
          <label for="note-title">Title:</label>
          <input v-model.trim="noteTitle" id="note-title" type="text"> 
        </div>
        <div>
          <label for="note-tag">Tag:</label>
          <input v-model.trim="tagField" id="note-tag" type="text">
          <button @click="addTag">Add</button>
          <div>
            List of tags:  
            <ul>
              <li is="tag-item" v-for="tag in getEditTagList()" v-bind:item="tag" v-bind:key="tag" @remove="removeTag"></li>
            </ul>
          </div>
        </div>
        <div>
          <div><label for="note-content">Content:</label></div>
          <textarea v-model="noteContent" id="note-content"></textarea>
          <div>
            <button @click="editNote">Edit</button>
            <button @click="removeNote">Remove</button>
          </div>
        </div>
      </div>
    </layout>
  </article>
</template>

<script>
  import Layout from './Layout'
  import Note from '../model/note/note.js'
  import TagList from '../model/tag/list.js'
  import Url from '../model/url.js'

  export default {
    name: 'note-edit',
    props: ['categoryStorage'],
    components: {
      layout: Layout
    },
    data() { 
      return {
        currentCategory: '',
        categories: this.categoryStorage.getList(),
        note: this.categoryStorage.getNoteFor(this.$route.params.noteId),
        noteTitle: '',
        noteContent: '',
        tagField: '',
        tagEditList: new TagList(),
        tagsToAdd: new TagList(),
        tagsToRemove: new TagList(),
      }
    },
    mounted: function() {
      this.noteTitle = this.note.getTitle();
      this.noteContent = this.note.getContent();
      this.tagEditList.addMany(this.note.getTags());
      this.currentCategory = this.note.getCategoryId();
    },
    computed: {
      getTitleNote: function() {
        return this.note.getTitle();
      },
      getTitleContent: function() {
        return this.note.getContent();
      },
      getCategoryName: function() {
        return this.categoryStorage.getTitleFor(this.note.getCategoryId());
      }
    },
    methods: {
      getEditTagList: function() {
        return this.tagEditList.get();
      },
      backToDashboard: function() {
        this.$router.push(Url.getDashboard());
      },
      backToCategory: function() {
        this.$router.push(Url.getCategoryShow(this.note.getCategoryId()));
      },
      backToNote: function() {
        this.$router.push(Url.getNoteShow(this.note.getId()));
      },
      addTag: function() {
        if (this.tagEditList.add(this.tagField)) {
          this.tagsToAdd.add(this.tagField);
        }
        this.tagField = '';
      },
      removeTag: function(event) {
        this.tagEditList.remove(event.target.dataset.title);
        this.tagsToRemove.add(event.target.dataset.title);
      },
      editNote: function() {
        let noteEdit = new Note();
        noteEdit.setId(this.note.getId());
        noteEdit.setCategoryId(this.currentCategory);
        noteEdit.setTitle(this.noteTitle);
        noteEdit.setContent(this.noteContent);
        noteEdit.setTags(this.tagEditList.get());
        this.categoryStorage.editNote(noteEdit, this.tagsToAdd, this.tagsToRemove);
      },
      removeNote: function() {
        let resultRemove = this.categoryStorage.removeNote(this.note.getId());
        if (resultRemove) {
          this.backToCategory();
        } 
      }
    }
  }
</script>