<template>
  <div class="center">
    <Login />
    <Logout />
  </div>
</template>

<script>
import Login from "@/components/Buttons/Login.vue";
import Logout from "@/components/Buttons/Logout.vue";

export default {
  components: {
    Login,
    Logout,
  },
};
</script>

<style scoped>
.center {
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
}
</style>
```
