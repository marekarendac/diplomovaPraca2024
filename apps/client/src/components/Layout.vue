<script>
import Navigation from "./Navigation.vue";
import Logout from "@/components/Buttons/Logout.vue";

export default {
  components: {
    Navigation,
    Logout,
  },
};
</script>

<template>
  <a-layout style="height: 100vh">
    <a-layout-header
      style="
        background-color: #1890ff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
      "
    >
      <router-link class="logo" :to="{ path: '/' }">EZSO</router-link>
      <Logout style="margin-right: 10px" />
    </a-layout-header>

    <a-layout has-sider>
      <a-layout-sider style="height: 100%"> <Navigation /></a-layout-sider>

      <a-layout>
        <a-layout-content><router-view /></a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<!-- Your existing styles here -->
<style>
.logo {
  color: white;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: xx-large;
  background-color: #1890ff;
  font-weight: 300;
  transition: none;
  padding-left: 30px;
}

/* Add these styles */
.logo:focus,
.logo:hover,
.logo:active {
  outline: none;
  text-decoration: none;
  color: white;
}
</style>
