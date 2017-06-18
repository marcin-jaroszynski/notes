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
          <input id="note-title" type="text"> 
        </div>
        <div>
          <label for="note-tag">Tag:</label>
          <input id="note-tag" type="text">
          <button>Add</button>
          <div>
            List of tags: 
          </div>
        </div>
        <div>
          <div><label for="note-content">Content:</label></div>
          <textarea id="note-content"></textarea>
          <div>
            <button>Add</button>
          </div>
        </div>
      </div>
    </layout>
  </article>
</template>

<script>
  import Layout from './Layout'
  export default {
    name: 'note-add',
    props: ['categoryStorage'],
    components: {
      layout: Layout
    },
    data() {
      return {
      
      }
    },
    methods: {
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
      }
    }
  }
</script>