<script setup>
import CardEq from "@/components/CardEquipment.vue";
import CardEm from "@/components/CardEmployee.vue";
import CardVe from "@/components/CardVehicle.vue";
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
      <a-row style="height: 100%; justify-content: center; width: 200vh"
        ><a-col :md="{ span: 4, offset: 1 }"
          ><router-link to="/vehicles"><CardVe /></router-link
        ></a-col>
        <a-col :md="{ span: 4, offset: 1 }"
          ><router-link to="/employees"><CardEm /></router-link
        ></a-col>
        <a-col :md="{ span: 4, offset: 1 }"
          ><router-link to="/equipment"><CardEq /></router-link
        ></a-col>
        <router-view></router-view>
      </a-row>
    </div>
  </div>
</template>
