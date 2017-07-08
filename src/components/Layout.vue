<template>
  <article>
    <div class="menu">
      <slot name="menu"></slot>
    </div>
    <div class="content">
      <div>
        <input type="text" placeholder="Search...">
        <button>Search</button>
        <button class="logout" @click="getLoginUrl()">Log out</button>
      </div>
      <slot name="content"></slot>
    </div>
  </article>
</template>

<script>
  import Url from '../model/url.js'

  export default {
    methods: {
      getLoginUrl: function() {
        this.$router.push(Url.getLogin());
      }
    }
  }
</script>

<style>
.menu {
  float: left;
  width: 20%;
}

.content {
  float: left;
  width: 80%;
  text-align: left;
}

.logout {
  float: right;
  margin-right: 1em;
}
</style>