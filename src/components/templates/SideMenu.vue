<template>
  <section>
    <div>{{ title }}</div>
    <nav>
      <ul>
        <li v-for="item in items"><router-link :to="item.getUrl()">{{ item.getTitle() }}</router-link></li>
      </ul>
    </nav>
  </section>
</template>

<script>
  export default {
    name: 'side-menu',
    props: ['title', 'items']
  }
</script>
