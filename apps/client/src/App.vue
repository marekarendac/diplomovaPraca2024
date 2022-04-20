<script setup></script>

<template>
  <div id="nav">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Table' }">Table</router-link>
    <router-view />
  </div>
</template>

<style></style>
