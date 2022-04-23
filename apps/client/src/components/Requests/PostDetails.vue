<template>
  <div>
    <h2>Post Details</h2>
  </div>
</template>

<script>
import Api from "@/services/Api.js";
export default {
  data() {
    return {
      postDetails: [],
    };
  },
  mounted() {
    this.getPostDetails();
  },
  methods: {
    getPostDetails() {
      Api.get("/employees").then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<style></style>
