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
  import Category from '../model/category/category.js'

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
      addCategory: async function() {
        let categoryToAdd = new Category({title: this.categoryNameFromField});
        if (this.storage.categories.isExist(categoryToAdd)) {
          alert('Category already exist! Not added');
          return;
        }
        try { 
          await this.$http.post('category/add', { title: categoryToAdd.getTitle() }); 
          this.storage.categories.add(categoryToAdd)
          this.categoryNameFromField = '';
        } catch (error) {
        }
      },
      chooseFromCategoryList: function(event) {
        let categoryCode = event.target.value;
        if (categoryCode == '') {
          this.categoryListAddMode();
        } else {
          this.categoryListEditMode(categoryCode); 
        }
      },
      categoryListAddMode: function() {
        this.isDisabledAddBtn = false;
        this.isDisabledEditBtn = true;
        this.categoryNameFromField = '';
        this.categoryNameFromSelect = '';
      },
      categoryListEditMode: function(categoryCode) {
        this.isDisabledAddBtn = true;
        this.isDisabledEditBtn = false;
        let titleSelectedCategory = this.storage.categories.getTitleFor(categoryCode);
        this.categoryNameFromSelect = titleSelectedCategory;
        this.categoryNameFromField = titleSelectedCategory;
      },
      changeCategoryTitle: async function() {
        let categoryWithNewTitle = new Category({title: this.categoryNameFromField});
        if (this.storage.categories.isExist(categoryWithNewTitle)) {
          alert('Category with this title is already exist!');
          return;
        }
        try {
          await this.$http.post('category/change-title', { currentTitle: this.categoryNameFromSelect, newTitle: categoryWithNewTitle.getTitle() });
          let updatedCategory = this.storage.categories.changeTitle(this.categoryNameFromSelect, this.categoryNameFromField);
          alert('Category title changed!');
          this.categoryNameFromSelect = updatedCategory.getTitle();
          this.categoryNameFromField = updatedCategory.getTitle();
        } catch(error) {
          this.$router.push(Url.getLogout());
        }
      }
    }
  }
</script>