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
    ><a-col style="padding-right: 5%"
      ><router-link to="/vehicles"><CardVe /></router-link
    ></a-col>
    <a-col
      ><router-link to="/employees"><CardEm /></router-link
    ></a-col>
    <a-col style="padding-left: 5%"
      ><router-link to="/equipment"><CardEq /></router-link
    ></a-col>
  </a-row>
</template>
<script>
import Api from "@/services/Api.js";

export default {
  data() {
    return {
      postDetails: null,
    };
  },

  mounted() {
    this.getPostDetails();
  },
  methods: {
    getPostDetails() {
      Api.get("/notifications").then((response) => {
        this.postDetails = response.data;

        console.log(response.data);
      });
    },
  },
};
</script>
