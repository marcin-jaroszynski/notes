<template>
  <span>  
    <span class="tag" v-for="tag in tags"><router-link :to="tag.url">{{ tag.title }}</router-link> </span>
  </span>
</template>

<script>
  export default {
    name: 'tags-list',
    props: ['tags']
  }
</script>

<style>
.tag {
  margin-left: 0.5em;
}
</style>
