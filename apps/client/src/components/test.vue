<template>
  <a-layout>
    <a-layout-header style="height: 9vh; background-color: #1890ff"
      >Header</a-layout-header
    >
    <a-layout style="height: 100vh">
      <a-layout-sider
        ><p class="logo">Portál</p>
        <Navigation
      /></a-layout-sider>
      <a-layout-content><router-view /></a-layout-content>
    </a-layout>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>
