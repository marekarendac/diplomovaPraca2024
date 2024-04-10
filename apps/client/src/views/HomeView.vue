<script setup>
import CardEq from "@/components/Cards/CardEquipment.vue";
import CardEm from "@/components/Cards/CardEmployee.vue";
import CardVe from "@/components/Cards/CardVehicle.vue";
</script>

<template>
  <a-row
    style="
      height: 100%;
      justify-content: center;
      align-items: center;
      display: flex;
    "
    ><a-col style="padding-right: 5%">
      <Tag
        v-if="vehiclesErrors"
        style="width: 100%"
        severity="warning"
        value="POZOR"
        icon="pi pi-exclamation-triangle"
      ></Tag>
      <Tag
        v-else
        style="width: 100%"
        severity="success"
        value="OK"
        icon="pi pi-check-square"
      ></Tag>
      <router-link to="/vehicles"><CardVe /></router-link
    ></a-col>

    <a-col>
      <Tag
        v-if="employeesErrors"
        style="width: 100%"
        severity="warning"
        value="POZOR"
        icon="pi pi-exclamation-triangle"
      ></Tag>
      <Tag
        v-else
        style="width: 100%"
        severity="success"
        value="OK"
        icon="pi pi-check-square"
      ></Tag>
      <router-link to="/employees"><CardEm /></router-link
    ></a-col>

    <a-col style="padding-left: 5%">
      <Tag
        v-if="equipmentErrors"
        style="width: 100%"
        severity="warning"
        value="POZOR"
        icon="pi pi-exclamation-triangle"
      ></Tag>
      <Tag
        v-else
        style="width: 100%"
        severity="success"
        value="OK"
        icon="pi pi-check-square"
      ></Tag>
      <router-link to="/equipment"><CardEq /></router-link
    ></a-col>
  </a-row>
</template>
<script>
import Api from "@/services/Api.js";
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  data() {
    return {
      vehiclesErrors: false,
      employeesErrors: false,
      equipmentErrors: false,
    };
  },

  mounted() {
    const auth = useAuth0();
    console.log("auth =>", auth);
    this.getDataNotifications();
  },
  methods: {
    getDataNotifications() {
      Api.get("/notifications").then((response) => {
        this.vehiclesErrors = response.data.vehiclesErrors;
        this.employeesErrors = response.data.employeesErrors;
        this.equipmentErrors = response.data.equipmentErrors;
      });
    },
  },
};
</script>
