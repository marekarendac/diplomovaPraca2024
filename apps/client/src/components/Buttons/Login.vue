<template>
  <div>
    <button class="login-button" @click="handleLogin">Log in</button>
  </div>
</template>

<script>
// Options API
export default {
  methods: {
    handleLogin() {
      this.$auth0.loginWithRedirect({
        appState: {
          target: "/",
        },
      });
    },
  },
};
</script>

<style scoped>
.login-button {
  background-color: #1890ff;
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
