<template>
</template>

<script>
import Url from '../model/url.js'

export default {
  props: ['storage'],
  name: 'logout',
  created() {
    this.storage.reset();
    this.$router.push(Url.getLogin());
  }
}
</script>