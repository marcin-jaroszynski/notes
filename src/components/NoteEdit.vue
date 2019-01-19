<template>
  <article>
    <title-page :title="getTitlePage"></title-page>
    <layout>
      <div slot="menu">
        <button @click="backToNote()" class="button">Back to note</button>
        <button @click="backToCategory()" class="button">Back to category: {{ getCategoryName }}</button>
        <button @click="backToDashboard()" class="button">Back to Dashboard</button>
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
          <input v-model.trim="tagField" @keyup.enter="addTag" id="note-tag" type="text">
          <button @click="addTag" class="button">Add</button>
          <div>
            List of tags:  
            <ul>
              <li is="tag-item" v-for="(tag, index) in getEditTagList()" v-bind:item="tag" v-bind:key="index" @remove="removeTag"></li>
            </ul>
          </div>
        </div>
        <div>
          <div><label for="note-content">Content:</label></div>
          <textarea v-model="noteContent" id="note-content"></textarea>
          <div>
            <button @click="editNote" class="button">Edit</button>
            <button @click="removeNote" class="button">Remove</button>
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
    props: ['storage'],
    components: {
      layout: Layout
    },
    data() { 
      return {
        currentCategory: '',
        categories: this.storage.categories.getAll(),
        note: this.storage.notes.get(this.$route.params.noteId),
        noteTitle: '',
        noteContent: '',
        tagField: '',
        tagEditList: new TagList(),
      }
    },
    mounted: function() {
      this.noteTitle = this.note.getTitle();
      this.noteContent = this.note.getContent();
      this.tagEditList.addMany(this.note.tags.get());
      this.currentCategory = this.note.getCategoryId();
      console.log('NOTE: ' + JSON.stringify(this.note.getCategoryId()));
    },
    computed: {
      getTitleNote: function() {
        return this.note.getTitle();
      },
      getTitleContent: function() {
        return this.note.getContent();
      },
      getCategoryName: function() {
        return this.storage.categories.getTitleFor(this.note.getCategoryId());
      },
      getTitlePage() {
        return 'Note - ' + this.getTitleNote + ' - Edit';
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
      redirectToCategory: function(categoryCode) {
        this.$router.push(Url.getCategoryShow(categoryCode));
      },
      backToNote: function() {
        this.$router.push(Url.getNoteShow(this.note.getId()));
      },
      addTag: function() {
        this.tagEditList.add(this.tagField);
        this.tagField = '';
      },
      removeTag: function(event) {
        this.tagEditList.remove(event.target.dataset.title);
      },
      editNote: async function() {
        let noteEdit = new Note();
        noteEdit.setId(this.note.getId());
        noteEdit.setCategoryId(this.currentCategory);
        noteEdit.setTitle(this.noteTitle);
        noteEdit.setContent(this.noteContent);
        noteEdit.tags.set(this.tagEditList.get());
        if (this.validate()) {
          let requestParams = {}
          requestParams.id = noteEdit.getId();
          requestParams.title = noteEdit.getTitle();
          requestParams.content = noteEdit.getContent();
          requestParams.category = noteEdit.getCategoryId();
          requestParams.tags = noteEdit.tags.get();
          try {
            await this.$http.post('note/edit', requestParams);
            this.storage.notes.edit(noteEdit);
          } catch(error) {
            this.$router.push(Url.getLogout());
          }
        } else {
          alert('Fill the required fields!');
        }
        
      },
      validate: function() {
        if (this.note.getId() && this.note.getCategoryId() && this.note.getTitle() && this.note.getContent()) {
          return true;
        }
        return false;
      },
      removeNote: async function() {
        if (confirm('Are you sure you want to remove that note?')) {
          let categoryCode = this.note.getCategoryId();
          await this.$http.post('note/remove', { id: this.note.getId() });
          let resultRemove = this.storage.notes.remove(this.note.getId());
          if (resultRemove) {
            this.redirectToCategory(categoryCode);
          }
        } 
      }
    }
  }
</script>