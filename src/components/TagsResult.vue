<template> 
  <article>
    <title-page title="Tag results"></title-page>
    <layout>
      <div slot="menu">
        <li><button @click="backToDashboard()">Back to Dashboard</button></li>
      </div>
      <div slot="content">
        <div>Entries for tag: XXX</div>
        <p>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>Category</td>
                <td>Date added</td>
              </tr>
              <tr v-for="entry in getEntriesForTag">
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

  export default {
    props: ['storage'],
    name: 'tags-result',
    components: {
      layout: Layout
    },
    data() {
      return {
        tagCode: this.$route.params.tagCode,
      }
    },
    computed: {
      getEntriesForTag() {
        return this.storage.notes.getForTag(this.tagCode);
      }     
    },
    methods: {
      backToDashboard: function() {
        this.$router.push(Url.getDashboard());
      },
    }
  }
</script>