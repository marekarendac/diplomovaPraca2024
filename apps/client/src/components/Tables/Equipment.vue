<template>
  <a-table :columns="columns" :data-source="postDetails">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a style="padding-left: 5px">Edituj</a>
        <a style="padding-left: 5px">Zmaž</a>
      </template>
    </template>
  </a-table>
</template>
<script>
import { defineComponent } from "vue";
import Api from "@/services/Api.js";
export default defineComponent({
  data() {
    return {
      postDetails: [],
      columns,
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
});
const columns = [
  {
    title: "ID",
    width: 100,
    dataIndex: "id",
    key: "id",
    fixed: "left",
  },
  {
    title: "Meno",
    width: 100,
    dataIndex: "idNumber",
    key: "age",
    fixed: "left",
  },
  {
    title: "Priezvisko",
    dataIndex: "brand",
    key: "1",
    width: 150,
  },
  {
    title: "Priezvisko",
    dataIndex: "equipmentType",
    key: "1",
    width: 150,
  },

  {
    title: "Operácia",
    key: "operation",
    fixed: "right",
    width: 100,
  },
];
</script>
