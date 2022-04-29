<template>
  <a-table
    :columns="columns"
    :data-source="postDetails"
    :pagination="{ pageSize: 10 }"
    :scroll="{ x: 1000, y: 320 }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <button class="operationEdit">Edituj</button>
        <a-button key="type" variant="primary" @click="showDeleteModal"
          >Zmaž</a-button
        >
        <a-modal
          v-model:visible="deleteModalVisible"
          title="Title"
          :confirm-loading="deleteInProgress"
          @ok="handleDelete(key)"
        >
          {{ `Chces vymazat employee ${record.id} ?` }}
        </a-modal>
      </template>
    </template>
  </a-table>
</template>
<script>
import { defineComponent, ref } from "vue";
import Api from "@/services/Api.js";
export default defineComponent({
  data() {
    return {
      postDetails: [],
      columns,
    };
  },
  setup() {
    const deleteModalVisible = ref(false);
    const deleteInProgress = ref(false);
    const showDeleteModal = () => {
      deleteModalVisible.value = true;
    };
    const handleDelete = (id) => {
      console.log(id);
      // modalText.value = "The modal will be closed after two seconds";
      deleteInProgress.value = true;
      Api.delete("/employees/id")
        .then((response) => {
          deleteModalVisible.value = false;
          deleteInProgress.value = false;
        })
        .catch((error) => {
          console.log(error);
          deleteModalVisible.value = false;
          deleteInProgress.value = false;
        });
    };
    return {
      showDeleteModal,
      deleteModalVisible,
      handleDelete,
      deleteInProgress,
    };
  },

  mounted() {
    this.getPostDetails();
  },
  methods: {
    getPostDetails() {
      Api.get("/employees").then((response) => {
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
    dataIndex: "firstName",
    key: "age",
    fixed: "left",
  },
  {
    title: "Priezvisko",
    dataIndex: "lastName",
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
