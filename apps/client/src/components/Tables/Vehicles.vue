<template>
  <a-table
    :columns="columns"
    :data-source="postDetails"
    :pagination="{ pageSize: 10 }"
    :scroll="{ x: 1000, y: 320 }"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a class="operationEdit">Edituj</a>
        <a class="operationDelete">Zmaž</a>
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
      Api.get("/cars").then((response) => {
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
    title: "Značka",
    width: 100,
    dataIndex: "brand",
    key: "age",
    fixed: "left",
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "1",
    width: 150,
  },
  {
    title: "Rok výroby",
    dataIndex: "year",
    key: "1",
    width: 150,
  },
  {
    title: "VIN číslo",
    dataIndex: "VIN",
    key: "1",
    width: 150,
  },
  {
    title: "Posledný servis",
    dataIndex: "lastService",
    key: "1",
    width: 150,
  },
  {
    title: "Pneumatiky",
    dataIndex: "tireSize",
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
<style>
.operationDelete {
  background: #db1111;
  border: 0;
  padding: 5px 5px;
  margin-top: 10px;
  color: white;
  border-radius: 10px;
  transition: none;
}
.operationEdit {
  background: #3b8ce7;
  border: 0;
  padding: 5px 5px;
  margin-top: 10px;
  color: white;
  border-radius: 10px;
  transition: none;
  margin-right: 1vh;
}
</style>
