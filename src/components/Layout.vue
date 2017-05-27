<template>
  <article>
    <div class="menu">
      <slot name="menu"></slot>
    </div>
    <div class="content">
      <div>
        <input type="text" placeholder="Search...">
        <button>Search</button>
        <a class="logout" href="/login">Log out</a>
      </div>
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
  width: 80%;
  text-align: left;
}

.logout {
  float: right;
  margin-right: 1em;
}
</style>