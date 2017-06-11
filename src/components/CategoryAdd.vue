<template>
  <article>
    <title-page title="Add new category section"></title-page>
    <layout>
      <div slot="menu">
        <button @click="backToDashboard()">Back to Dashboard</button>
      </div>
      <div slot="content">
        <div>Add new category</div>
        <div>
          Categories:
          <select>
            <option v-for="category in categories" :value="category.code">{{ category.title }}</option>
          </select>
        </div>
        <p>
          Name of new category: <input type="text" v-model.trim="nameCategoryToAdd">
          <button @click="addCategory()">Add</button>
        </p>
      </div>
    </layout>
  </article>
</template>

<script>
  import Layout from './Layout'
  import CategoryModel from '../model/category.js'
  import HelperModel from '../model/helper.js'

  let categoryModel = new CategoryModel();
  export default {
    name: 'category-add', 
    components: {
      layout: Layout
    },
    data() {
      return {
        categories: categoryModel.getList(),
        nameCategoryToAdd: '',
      }
    },
    methods: {
      backToDashboard: function() {
        this.$router.push('/dashboard');
      },
      addCategory: function() {
        // console.log('Name category to add: ' + this.nameCategoryToAdd);
        console.log('Slugify name category: ' + HelperModel.slugify(this.nameCategoryToAdd));
      }
    }
  }
</script>