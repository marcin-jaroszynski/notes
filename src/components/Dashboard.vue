<template>
  <article>
    <title-page title="Dashboard"></title-page>
    <layout>
      <div slot="menu">AAAA</div>
      <div slot="content">
        <div>Dashboard</div>
      </div>
    </layout>
  </article>
</template>

<script>
  import Layout from './Layout'
  export default {
    name: 'dashboard',
    components: {
      layout: Layout
    },
    data() {
      return {

      }
    }
  }
</script>