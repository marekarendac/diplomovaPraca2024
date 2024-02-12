<template>
  <div>
    <button class="logout-button" @click="logout">Log out</button>
  </div>
</template>
<script>
// Options API
export default {
  methods: {
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: "http://localhost:3000/login",
        },
      });
    },
  },
};
</script>

<style scoped>
.logout-button {
  background-color: rgb(209, 4, 4);
  color: white;
  padding: 15px 30px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: rgb(139, 0, 0);
}
</style>
