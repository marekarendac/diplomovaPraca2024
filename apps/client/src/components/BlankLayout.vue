<template>
  <a-layout>
    <a-layout-header style="background-color: #1890ff">
      <div class="logo">EZSO</div>
    </a-layout-header>

    <a-layout-content
      style="display: flex; justify-content: center; align-items: center"
    >
      <slot></slot>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.logo {
  color: white;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: xx-large;
  background-color: #1890ff;
  font-weight: 300;
  transition: none;
}
</style>
