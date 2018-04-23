<template>
  <section>
    <div>{{ title }}</div>
    <nav>
      <ul class="menu__categories">
        <li v-for="item in items"><router-link :to="item.url">{{ item.title }}</router-link></li>
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
