<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header
      style="
        position: fixed;
        width: 100%;
        z-index: 2;
        background-color: #1890ff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
      "
    >
      <router-link class="logo" :to="{ path: '/' }">EZSO</router-link>
      <Logout style="margin-left: auto" />
    </a-layout-header>

    <a-layout has-sider style="background-color: #001529; margin-top: 64px">
      <a-layout-sider
        v-model:collapsed="collapsed"
        collapsible
        :style="{
          overflow: 'auto',
          height: 'calc(100vh - 64px)',
          position: 'fixed',
          left: 0,
          top: '64px',
        }"
      >
        <Navigation />
      </a-layout-sider>

      <a-layout>
        <a-layout-content
          :style="{ 'margin-left': contentMargin, overflow: 'initial' }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<!-- Rest of your code -->

<!-- Rest of your code -->
<script>
import Navigation from "./Navigation.vue";
import Logout from "@/components/Buttons/Logout.vue";

export default {
  components: {
    Navigation,
    Logout,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    contentMargin() {
      return this.collapsed ? "80px" : "200px";
    },
  },
};
</script>

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
html {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

html:hover {
  scrollbar-color: rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0);
}
</style>
