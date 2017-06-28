<template>
  <li>
      {{ item.title }}
      <button @click="$emit('remove', $event)" :data-title="item.title">X</button>
  </li>
</template>

<script>
  export default {
    name: 'tag-item',
    props: ['item']
  }
</script>
