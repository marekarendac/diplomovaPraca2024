<script setup>
import Card from "@/components/Card.vue";
</script>

<template>
  <div
    style="
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: space-evenly;
    "
  >
    <div>
      <a-row style="height: 100%; justify-content: center; width: 200vh">
        <a-col :md="{ span: 4, offset: 1 }"><Card /></a-col>
        <a-col :md="{ span: 4, offset: 1 }"><Card /></a-col>
        <a-col :md="{ span: 4, offset: 1 }"><Card /></a-col>
      </a-row>
    </div>
  </div>
</template>
