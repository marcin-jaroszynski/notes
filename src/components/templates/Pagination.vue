<template>
  <section>
    <nav v-if="getPages().length > 1">
      <span>Pages:</span>
      <ul>
        <li v-for="item in getPages()">
          <span v-if="!item.isSeparator"><router-link :to="item.url">{{ item.title }}</router-link></span>
          <span v-else>{{ item.title }}</span>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
  import Pagination from '../../model/pagination.js'
  export default {
    name: 'pagination',
    props: ['currentPage', 'numOfAllEntries', 'offset', 'numEntriesPerPage', 'url'],
    methods: {
      getPages() {
        let items = [];
        let pagination = new Pagination();
        pagination.setNumOfAllEntries(parseInt(this.numOfAllEntries));
        pagination.setCurrentPage(parseInt(this.currentPage));
        pagination.setOffset(parseInt(this.offset));
        pagination.setNumEntriesPerPage(parseInt(this.numEntriesPerPage));

        let start = 1;
        let to = pagination.getOffset();

        if (pagination.getOffset() > pagination.getPages()) {
          to = pagination.getPages();
        }

        let isDisplayFirstPageWithSeparator = ( pagination.getCurrentPage() >= pagination.getOffset() && pagination.getPages() != pagination.getOffset() );
        if (isDisplayFirstPageWithSeparator) {
          start = pagination.getCurrentPage() - 1;
          to = start + pagination.getOffset() - 1;
          items.push(this._getItem(1));
          items.push(this._getSeparator());
        }

        if (to > pagination.getPages()) {
          start = pagination.getPages() - pagination.getOffset() + 1;
          to = pagination.getPages();
        }

        for (let page = start; page <= to; page++) {
          items.push(this._getItem(page));
        }

        let isDisplayLastPageWithSeparator = (pagination.getCurrentPage() + 1 < pagination.getPages() && pagination.getPages() != pagination.getOffset() ); 
        if (isDisplayLastPageWithSeparator) {
          items.push(this._getSeparator());
          items.push(this._getItem(pagination.getPages()));
        }
        return items;
      },
      getNumOfPages() {

      },
      _getSeparator() {
        return this._getItem('...', true);
      },
      _getItem(page, isSeparator=false) {
        return {
          title: page,
          url: this.url + page,
          isSeparator: isSeparator
        }
      }
    }
  }
</script>

<style scoped>
  ul {
    display: inline-block;
    list-style-type: none;
  }

  li {
    display:inline-block;
    vertical-align: top;
    margin-right: 10px;
  }
</style>