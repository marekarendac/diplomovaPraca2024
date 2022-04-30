<template>
  <div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="postDetails"
        v-model:selection="selectedProducts"
        dataKey="id"
        responsiveLayout="scroll"
        :scrollable="true"
        scrollHeight="73vh"
      >
        <Column selectionMode="multiple" style="width: 3rem"></Column>
        <Column field="id" header="id" style="min-width: 12rem"></Column>
        <Column
          field="idNumber"
          header="idNumber"
          style="min-width: 16rem"
        ></Column>

        <Column field="brand" header="brand" style="min-width: 8rem"> </Column>
        <Column
          field="equipmentType"
          header="equipmentType"
          style="min-width: 10rem"
        ></Column>

        <Column style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Edituj záznam"
      :modal="true"
      class="p-fluid"
    >
      <div class="field col">
        <label for="id">id</label>
        <p id="id" />
      </div>

      <div class="field">
        <label for="name">idNumber</label>
        <InputText
          id="name"
          v-model.trim="product.idNumber"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !product.idNumber }"
        />
        <small class="p-error" v-if="submitted && !product.idNumber"
          >idNumber je povinné.</small
        >
      </div>
      <div class="field">
        <label for="brand"> brand</label>
        <InputText id="name" v-model="product.brand" required="true" />
      </div>

      <div class="field">
        <label for="equipmentType"> equipmentType</label>
        <InputText id="name" v-model="product.equipmentType" required="true" />
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
          @click="saveProduct"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Are you sure you want to delete <b>{{ product.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteProduct"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Are you sure you want to delete the selected products?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductsDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedProducts"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import Api from "@/services/Api.js";
export default {
  data() {
    return {
      products: null,
      postDetails: [],
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProducts: null,

      submitted: false,
    };
  },

  // setup() {
  //   const deleteInProgress = ref(false);
  //   const handleDelete = (id) => {
  //     console.log(id);
  //     deleteInProgress.value = true;
  //     Api.delete("/employees/id")
  //       .then((response) => {
  //         deleteInProgress.value = false;
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         deleteInProgress.value = false;
  //       });
  //   };
  //   return {
  //     handleDelete,
  //     deleteInProgress,
  //   };
  // },

  mounted() {
    this.getPostDetails();
  },
  methods: {
    getPostDetails() {
      Api.get("/equipment").then((response) => {
        this.postDetails = response.data;
      });
    },

    formatCurrency(value) {
      if (value)
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      return;
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
    saveProduct() {
      this.submitted = true;

      if (this.product.name.trim()) {
        if (this.product.id) {
          this.product.inventoryStatus = this.product.inventoryStatus.value
            ? this.product.inventoryStatus.value
            : this.product.inventoryStatus;
          this.products[this.findIndexById(this.product.id)] = this.product;
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Updated",
            life: 3000,
          });
        } else {
          this.product.id = this.createId();
          this.product.code = this.createId();
          this.products.push(this.product);
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Created",
            life: 3000,
          });
        }

        this.productDialog = false;
        this.product = {};
      }
    },
    editProduct(product) {
      this.product = { ...product };
      this.productDialog = true;
    },
    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },
    deleteProduct() {
      this.products = this.products.filter((val) => val.id !== this.product.id);
      console.log(this.product.id);
      this.deleteProductDialog = false;
      this.product = {};
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Deleted",
        life: 3000,
      });
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    },
    createId() {
      let id = "";
      var chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    },

    confirmDeleteSelected() {
      this.deleteProductsDialog = true;
    },
    deleteSelectedProducts() {
      this.products = this.products.filter(
        (val) => !this.selectedProducts.includes(val)
      );
      this.deleteProductsDialog = false;
      this.selectedProducts = null;
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Products Deleted",
        life: 3000,
      });
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
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

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
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
