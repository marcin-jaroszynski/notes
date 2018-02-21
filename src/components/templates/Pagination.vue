<template>
  <section>
    <nav>
      <span>Pages:</span>
      <ul>
        <li v-for="page in getPages()" v-if="!page.isSeparator"><router-link :to="page.url">{{ page.title }}</router-link></li>
        <li v-else>...</li>
      </ul>
    </nav>
  </section>
</template>

<script>
  export default {
    name: 'pagination',
    props: ['pages', 'currentpage', 'url'],
    data() {
      return {
        maxPages: parseInt(this.pages),
        currentPage: parseInt(this.currentpage)
      }
    },
    methods: {
      getPages() {
        this.currentPage = parseInt(this.currentpage);
        let links = [];
        let start = 1;
        let to = 1;
        let offset = 3;
        if (this.currentPage == 1) {
          start = 1;
        } else {
          start = this.currentPage - 1;
        }

        to = start + offset;
        
        if (to > this.maxPages) {
          start = this.maxPages - 2;
          to = this.maxPages + 1;
        }
        
        for (let page = start; page < to; page++) {
          links.push(this._getItem(page, this.url + page));
        }
        if ( (this.maxPages - this.currentPage) >= offset-1 ) { 
          links.push(this._getSeparator());
          links.push(this._getItem(this.maxPages, this.url + this.maxPages));
        }
        return links;
      },
      _getSeparator() {
        return this._getItem('...', '', true);
      },
      _getItem(title, url, isSeparator=false) {
        return {
          title: title,
          url: url,
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