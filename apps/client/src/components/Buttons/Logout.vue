<template>
  <div class="logout-container">
    <button class="logout-button" @click="logout">Odhlásiť</button>
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
.logout-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logout-button {
  background-color: rgb(209, 4, 4);
  color: white;
  padding: 5px 10px;
  font-size: 16px;

  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
  margin-right: 20px;
}

.logout-button:hover {
  background-color: rgb(139, 0, 0);
}
</style>
