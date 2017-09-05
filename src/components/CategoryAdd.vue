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
          <select @change="chooseFromCategoryList">
            <option value="">Choose category to edit...</option>
            <option v-for="category in categories" :value="category.code">{{ category.title }}</option>
          </select>
        </div>
        <p>
          Name of new category: <input type="text" v-model.trim="categoryNameFromField">
          <button @click="addCategory()" :disabled="isDisabledAddBtn">Add</button>
          <button @click="changeCategoryTitle()" :disabled="isDisabledEditBtn">Edit</button>
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
    name: 'category-add', 
    components: {
      layout: Layout
    },
    data() {
      return {
        categories: this.storage.categories.getAll(),
        categoryNameFromField: '',
        categoryNameFromSelect: '',
        isDisabledAddBtn: false,
        isDisabledEditBtn: true
      }
    },
    methods: {
      backToDashboard: function() {
        this.$router.push(Url.getDashboard());
      },
      addCategory: function() {
        if (this.storage.categories.add(this.categoryNameFromField)) {
          console.log('Category added');
          this.categoryNameFromField = '';
        } else {
          console.log('Category already exist! Not added');
        }
      },
      chooseFromCategoryList: function(event) {
        let categoryCode = event.target.value;
        if (categoryCode == '') {
          this.isDisabledAddBtn = false;
          this.isDisabledEditBtn = true;
          this.categoryNameFromField = '';
          this.categoryNameFromSelect = '';
        } else {
          this.isDisabledAddBtn = true;
          this.isDisabledEditBtn = false;
          this.categoryNameFromSelect = this.storage.categories.getTitleFor(categoryCode);
          this.categoryNameFromField = this.storage.categories.getTitleFor(categoryCode);
        }
      },
      changeCategoryTitle: function() {
        let result = this.storage.categories.changeTitle(this.categoryNameFromSelect, this.categoryNameFromField);
        if (result.getTitle() == this.categoryNameFromField) {
          alert('Category title changed!');
          this.categoryNameFromSelect = result.getTitle();
          this.categoryNameFromField = result.getTitle();
        } else {
          alert('Category with this title is already exist!');
        }
      }
    }
  }
</script>