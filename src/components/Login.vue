<template>
  <article>
    <h2>Login screen</h2>
    <input v-model="loginField" type="email" name="login" placeholder="your login e-mail">
    <br>
    <input v-model="passwordField" type="password" name="password" placeholder="password">
    <br>
    <button @click="validate">Sign in</button>
  </article>
</template>

<script>
export default {
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
        alert('Yep! Go to dashboard!');
      } else {
        alert('Nope! You entered invalid data!');
      }
    }
  }
}
</script>