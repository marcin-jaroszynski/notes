<template>
  <article>
    <title-page title="Category section"></title-page>
    <layout>
      <div slot="menu">
        <side-menu title="Categories" v-bind:items="categories"></side-menu>
        <button>Strona główna</button>
      </div>
      <div slot="content">
        <div>Category: {{ nameCategory }}</div>
        <div>
          Number of entries: {{ countEntriesCategory }}
          <button>Add new entry</button>
        </div>
        <p>
          <div>Latest entries:</div>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>Date added</td>
              </tr>
              <tr v-for="entry in entries">
                <td><a :href="entry.note_url">{{ entry.title }}</a></td>
                <td>{{ entry.date_added }}</td>
              </tr>
            </tbody>
          </table>
          <div>
          Tags: <a v-for="tag in tags" :href="tag.url">{{ tag.title }} </a>
          </div>
        </p>
      </div>
    </layout>
  </article>
</template>

<script>
  import Layout from './Layout'
  import CategoryModel from '../model/category.js'
  export default {
    name: 'category', 
    components: {
      layout: Layout
    },
    data() {
      return {
        nameCategory: 'XXX',
        countEntriesCategory: 25,
        categories: CategoryModel.getList(),
        entries: [
          { title: 'Entry 1', category: 'CSS', note_url: '/note/show/1', date_added:'26.05.2017 22:36:56' },
          { title: 'Entry 2', category: 'MySQL', note_url: '/note/show/2', date_added:'26.05.2017 22:36:56' },
          { title: 'Entry 3', category: 'PHP', note_url: '/note/show/3', date_added:'26.05.2017 22:36:56' },
          { title: 'Entry 4', category: 'HTML 5', note_url: '/note/show/4', date_added:'26.05.2017 22:36:56' },
          { title: 'Entry 5', category: 'JavaScript', note_url: '/note/show/5', date_added:'26.05.2017 22:36:56' }
        ],
        tags: [
          { title: 'Tag 1', url: '/tags/tag1' },
          { title: 'Tag 2', url: '/tags/tag2' },
          { title: 'Tag 3', url: '/tags/tag3' },
          { title: 'Tag 4', url: '/tags/tag4' },
        ]
      }
    }
  }
</script>