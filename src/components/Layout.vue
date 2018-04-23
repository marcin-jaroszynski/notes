<template>
  <article>
    <div ref="showmenu" class="button button--show-menu" @click="showMenu">☰</div>
    <div ref="menu" class="menu">
      <div ref="hidemenu" class="button button--hide-menu" @click="hideMenu">Hide</div>
      <slot name="menu"></slot>
    </div>
    <div ref="content" class="content">
      <div>
        <button class="button logout" @click="getLogoutUrl()">Log out</button>
      </div>
      <slot name="content"></slot>
    </div>
  </article>
</template>

<script>
  import Url from '../model/url.js'

  export default {
    methods: {
      getLogoutUrl: function() {
        this.$router.push(Url.getLogout());
      },
      showMenu: function(event) {
        this.$refs['showmenu'].style.display = 'none';
        this.$refs['menu'].style.display = 'block';
        console.log('Toggle menu!');
      },
      hideMenu: function(event) {
        this.$refs['showmenu'].style.display = 'block';
        this.$refs['menu'].style.display = 'none';
      }
    }
  }
</script>

<style>
.menu {
  background: #ececec;
  display: none;
  position: absolute;
  width: 50%;
  max-width: 320px;
}

.content {
  text-align: left;
}

.logout {
  float: right;
  margin-right: 1em;
}

.button--hide-menu {
  margin: 0 auto;
}

.menu__categories li {
  margin: 0.5em 0;
}

@media screen and (min-width: 56.25em) {
  .menu {
    display: block;
    position: relative;
    float: left;
    width: 20%;
  }

  .content {
    float: left;
    width: 80%;
  }

  .button--show-menu,
  .button--hide-menu {
    display: none;
  }
}
</style>