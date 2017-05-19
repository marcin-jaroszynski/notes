<template>
  <article>
    <div class="menu">
      <slot name="menu"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </article>
</template>

<style>
.menu {
  float: left;
  width: 20%;
}

.content {
  float: left;
  width: 80%
}
</style>