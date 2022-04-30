<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <Button
          label="New"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          @click="openNew"
        />
        <!-- <Button
          label="Delete"
          icon="pi pi-trash"
          class="p-button-danger"
          @click="confirmDeleteSelected"
          :disabled="!selectedProducts || !selectedProducts.length"
        /> -->
      </template>
    </Toolbar>
    <DataTable :value="postDetails" :scrollable="true" scrollHeight="73vh">
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

  <Dialog
    @submit.prevent="handleSubmit"
    v-model:visible="productDialog"
    :style="{ width: '450px' }"
    header="Detail produktu"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label>id</label>
      <input type="id" required v-model="id" />
    </div>

    <div class="field col">
      <label>idNumber</label>
      <input type="idNumber" required v-model="idNumber" />
    </div>

    <div class="field col">
      <label>brand</label>
      <input type="brand" required v-model="brand" />
    </div>

    <div class="field col">
      <label>equipmentType</label>
      <input type="equipmentType" required v-model="equipmentType" />
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="handleSubmit"
      />
    </template>
  </Dialog>
</template>

<script>
import Api from "@/services/Api.js";
export default {
  data() {
    return {
      products: null,
      postDetails: [],
      submitted: false,
      productDialog: false,
      product: {},
      deleteProductDialog: false,
      id: "",
      idNumber: "",
      brand: "",
      equipmentType: "",
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
    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    },

    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },

    handleSubmit() {
      Api.post("/equipment", {
        id: this.id,
        idNumber: this.idNumber,
        brand: this.brand,
        equipmentType: this.equipmentType,
      }).then((response) => {
        console.log(response.data);
      });
    },

    // deleteProduct() {
    //   this.products = this.products.filter((val) => val.id !== this.product.id);
    //   this.deleteProductDialog = false;
    //   this.product = {};
    //   this.$toast.add({
    //     severity: "success",
    //     summary: "Successful",
    //     detail: "Product Deleted",
    //     life: 3000,
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
