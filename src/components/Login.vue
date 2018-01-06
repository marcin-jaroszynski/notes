<template>
  <article>
    <title-page title="Login"></title-page>
    <h2>Login screen</h2>
    <input v-model="loginField" type="email" name="login" placeholder="your login e-mail">
    <br>
    <input v-model="passwordField" type="password" name="password" placeholder="password">
    <br>
    <button @click="validate">Sign in</button>
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
    validate: function(e) {
      if (this.loginField.length > 0 && this.passwordField.length > 0) {
        let that = this;
        this.$http.get('storage/init', {}, function(data) {
          that.storage.init(data);
          that.$router.push(Url.getDashboard());
        });
        
      } else {
        alert('Nope! You entered invalid data!');
      }
    }
  }
}
</script>