<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

textarea {
  width: 50em;
  height: 25em;
}

pre {
  white-space: pre-wrap;
}

.button {
  max-width: 10em;
  background: white;
  border: 1px solid black;
  padding: 1em;
  color: black;
  outline: 0;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.25s ease-out;
}

.button:hover {
  background: black;
  color: white;
}

.button:active {
  transform: translateY(4px);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

</style>
