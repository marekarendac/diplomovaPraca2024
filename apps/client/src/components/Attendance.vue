<template>
  <div class="card">
    <DataTable
      :value="postDetails"
      :scrollable="true"
      scrollHeight="88vh"
      :loading="loading"
    >
      <Column field="id" header="id" style="min-width: 200px"></Column>
      <Column
        field="idNumber"
        header="idNumber"
        style="min-width: 200px"
      ></Column>
      <Column field="brand" header="brand" style="min-width: 200px"></Column>
      <Column
        field="equipmentType"
        header="equipmentType"
        style="min-width: 200px"
      ></Column>
    </DataTable>
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
      Api.get("/equipment").then((response) => {
        this.postDetails = response.data;
      });
    },
  },
};
</script>
