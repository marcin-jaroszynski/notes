<template> 
  <article>
    <title-page title="Tag results"></title-page>
    <layout>
      <div slot="menu">
        <li><button @click="backToDashboard()">Back to Dashboard</button></li>
      </div>
      <div slot="content">
        <div>Entries for tag: {{ getTitleTag }}</div>
        <p>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>Category</td>
                <td>Date added</td>
              </tr>
              <tr v-for="entry in notesList">
                <td><router-link :to="entry.noteUrl">{{ entry.noteTitle }}</router-link></td>
                <td><router-link :to="entry.categoryUrl">{{ entry.categoryTitle }}</router-link></td>
                <td>{{ entry.noteDateAdded }}</td>
              </tr>
            </tbody>
          </table>
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
    name: 'tags-result',
    components: {
      layout: Layout
    }, 
    beforeRouteEnter(to, from, next) {
      next(vm => vm.setData());
    },
    data() {
      return {
        tagCode: this.$route.params.tagCode,
        notesList: []
      } 
    },
    computed: {
      getEntriesForTag() {
        let noteList = this.storage.notes.getForTag(this.tagCode);
        return noteList;
      },
      getTitleTag() {
        let tagInfo = this.storage.tags.tag(this.tagCode);
        return tagInfo.getTitle();
      }     
    },
    methods: {
      setData: async function() {
        try {
          let response = await this.$http.get('note/getByTag', { tag: this.tagCode });
          let categories = this.storage.categories.getAllAsHash();
          if (response.success === true) {
            let notes = [];
            for (let i = 0; i < response.notes.length; i++) {
              if (categories[response.notes[i].category]) {
                let category = categories[response.notes[i].category];
                let note = new Note();
                note.setTitle(response.notes[i].title);
                note.setId(response.notes[i]._id);
                note.setDateAdded(response.notes[i].created_date);
                notes.push({
                  categoryTitle: category.getTitle(),
                  categoryUrl: category.getUrl(),
                  noteTitle: note.getTitle(),
                  noteUrl: note.getUrl(),
                  noteDateAdded: note.getDateAdded()
                });
              }
            }
            this.notesList = notes;
          }
        } catch(error) {
          this.$router.push(Url.getLogout());
        }
      },
      backToDashboard: function() {
        this.$router.push(Url.getDashboard());
      },
    }
  }
</script>