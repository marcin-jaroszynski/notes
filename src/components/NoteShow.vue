<template>
  <article>
    <title-page :title="getTitlePage"></title-page>
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
          Tags: <tags-list v-bind:tags="note.tags.get()"></tags-list>
        </div>
        <p>
          <pre>{{ note.getContent() }}</pre>
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
    name: 'note-show', 
    components: {
      layout: Layout
    },
    beforeRouteEnter(to, from, next) {
      next(vm => vm.setNote());
    },
    data() {
      return {
        note: this.getNote()
      }
    },
    computed: {
      getTitlePage() {
        return 'Note - ' + this.note.getTitle();
      }
    },
    methods: {
      setNote: async function() {
        let note = this.getNote();
        if (note.isEmpty()) {
          let noteId = this.getNoteId();
          try {
            let noteResponse = await this.$http.get('note/get', { id: noteId });
            if (noteResponse.success === true) {
              let noteToSet = new Note();
              noteToSet.setId(noteResponse.id);
              noteToSet.setTitle(noteResponse.title);
              noteToSet.setContent(noteResponse.content);
              noteToSet.setCategoryId(noteResponse.category);
              noteToSet.setDateAdded(noteResponse.created_date);
              noteToSet.tags.set(noteResponse.tags);
              this.storage.notes.set(noteToSet);
              this.note = noteToSet;
            }
          } catch(error) {
            this.$router.push(Url.getLogout());
          }
        } 
      },
      getNoteId: function() {
        return this.$route.params.noteId;
      },
      backToDashboard: function() {
        this.$router.push(Url.getDashboard());
      },
      getNote: function() {
        return this.storage.notes.get(this.getNoteId());
      },
      getTitleCategory: function() {
        return this.storage.categories.getTitleFor(this.note.getCategoryId());
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