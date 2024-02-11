<template>
  <div>
    <button class="login-button" @click="login">Log in</button>
  </div>
</template>

<script>
// Options API
export default {
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
  },
};
</script>

<style scoped>
.login-button {
  background-color: blue;
  color: white;
  padding: 15px 30px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: darkblue;
}
</style>
