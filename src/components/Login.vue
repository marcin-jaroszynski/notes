<template>
  <article>
    <title-page title="Login"></title-page>
    <h2>Login screen</h2>
    <input v-model="loginField" type="email" name="login" placeholder="your login e-mail" class="login_field">
    <br>
    <input v-model="passwordField" type="password" name="password" placeholder="password" class="login_field">
    <br>
    <button @click="validate" class="button">Sign in</button>
  </article>
</template>

<script>
import Url from '../model/url.js'

export default {
  props: ['storage'],
  name: 'login',
  data() {
    return {
      loginField: '',
      passwordField: ''
    }
  },
  methods: {
    validate: async function(e) {
      if (this.loginField.length > 0 && this.passwordField.length > 0) {
        try {
          let data = await this.$http.get('login', { login: this.loginField, password: this.passwordField });
          this.storage.init(data);
          this.$router.push(Url.getDashboard());
        } catch(error) {
        }
      } else {
        alert('Nope! You entered invalid data!');
      }
    }
  }
}
</script>

<style>
.login_field {
  height: 2em;
  margin-bottom: 1.5em;
  border: 1px solid black;
  padding: 0.25em;
}
</style>