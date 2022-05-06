<template>
  <Card>
    <template #header> </template>
    <template #title> Advanced Card </template>
    <template #content><p class="text-center">KOKOT</p></template>
  </Card>
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
      Api.get("/attendances/months").then((response) => {
        this.postDetails = response.data;
        console.log(response.data[0], "months");
      });
    },
  },
};
</script>
