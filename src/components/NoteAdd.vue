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
              <li is="tag-item" v-for="(tag, index) in getTagList()" v-bind:item="tag" v-bind:key="index" @remove="removeTag"></li>
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
  import Url from '../model/url.js'

  export default {
    name: 'note-add',
    props: ['storage'],
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
        return this.note.tags.get();
      },
      getCurrentCategoryId: function() {
        return this.$route.params.categoryId;
      },
      backToDashboard: function() {
        this.$router.push(Url.getDashboard());
      },
      backToCategory: function() {
        this.$router.push(Url.getCategoryShow(this.getCurrentCategoryId()));
      },
      getCategoryName: function() {
        return this.storage.categories.getTitleFor(this.getCurrentCategoryId());
      },
      addTag: function() {
        this.note.tags.add(this.tagField);
        this.tagField = '';
      },
      removeTag: function(event) {
        this.note.tags.remove(event.target.dataset.title);
      },
      addNote: async function() {
        this.note.setCategoryId(this.getCurrentCategoryId());
        this.note.setTitle(this.titleField);
        this.note.setContent(this.contentField);
        if (this.validate()) {
          let requestParams = {}
          requestParams.title = this.note.getTitle();
          requestParams.content = this.note.getContent();
          requestParams.category = this.note.getCategoryId();
          requestParams.tags = this.note.tags.get();
          try {
            let requestResopnse = await this.$http.post('note/add', requestParams);
            this.note.setId(requestResopnse.idAddedNote);
            this.note.setDateAdded(requestResopnse.dateAddedNote);
            this.storage.notes.add(this.note);
            this.resetFields();
          } catch(error) {
            this.$router.push(Url.getLogout());
          }
        } else {
          alert('Fill the required fields!');
        }
      },
      validate: function() {
        if (this.note.getCategoryId() && this.note.getTitle() && this.note.getContent()) {
          return true;
        }
        return false;
      },
      resetFields: function() {
        this.note = new Note();
        this.titleField = '';
        this.contentField = '';
      }
    }
  }
</script>