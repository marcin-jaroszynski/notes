<template>
  <section>
    <div>{{ title }}</div>
    <nav>
      <ul>
        <li v-for="item in items"><a :href="item.url">{{ item.title }}</a></li>
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
