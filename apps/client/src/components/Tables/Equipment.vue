<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <Button
          label="Nový"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          @click="openNew"
        />
      </template>
    </Toolbar>
    <DataTable :value="postDetails" :scrollable="true" scrollHeight="70vh">
      <Column field="id" header="ID" style="min-width: 1vh"></Column>
      <Column
        field="idNumber"
        header="Identifikačné číslo"
        style="min-width: 1vh"
      ></Column>
      <Column field="brand" header="Značka" style="min-width: 1vh"></Column>
      <Column
        field="equipmentType"
        header="Typ nástroja"
        style="min-width: 1vh"
      ></Column>

      <Column :exportable="false" style="min-width: 1vh">
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
    @submit.prevent="handleSubmit"
    v-model:visible="productDialog"
    :style="{ width: '450px' }"
    header="Pridaj nový záznam"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="idNumber">Identifikačné číslo</label>
      <InputText
        id="idNumber"
        required="true"
        v-model.trim="product.idNumber"
        autofocus
        :class="{ 'p-invalid': submitted && !product.idNumber }"
      />
      <small class="p-error" v-if="submitted && !product.idNumber"
        >idNumber is required.</small
      >
    </div>

    <div class="field col">
      <label for="brand">Značka</label>
      <InputText
        id="brand"
        required="true"
        v-model.trim="product.brand"
        autofocus
        :class="{ 'p-invalid': submitted && !product.brand }"
      />
      <small class="p-error" v-if="submitted && !product.brand"
        >Značka is required.</small
      >
    </div>

    <div class="field col">
      <label for="equipmentType">Typ nástroja</label>
      <InputText
        id="equipmentType"
        required="true"
        v-model.trim="product.equipmentType"
        autofocus
        :class="{ 'p-invalid': submitted && !product.equipmentType }"
      />
      <small class="p-error" v-if="submitted && !product.equipmentType"
        >Typ nástroja is required.</small
      >
    </div>

    <template #footer>
      <Button
        label="Ukončiť"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <Button
        label="Uložiť"
        icon="pi pi-check"
        class="p-button-text"
        @click="handleSubmit"
      /><Toast />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="deleteProductDialog"
    :style="{ width: '450px' }"
    header="Zmazanie"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="product"
        >Chceš zmazať záznam s ID číslom <b>{{ product.idNumber }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        label="Nie"
        icon="pi pi-times"
        class="p-button-text"
        @click="deleteProductDialog = false"
      />
      <Button
        label="Áno"
        icon="pi pi-check"
        class="p-button-text"
        @click="deleteProduct"
      />
      <Toast />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="productDialogEdit"
    :style="{ width: '450px' }"
    header="Edituj vybraný záznam"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="idNumber">Identifikačné číslo</label>
      <InputText
        id="idNumber"
        required="true"
        v-model.trim="product.idNumber"
        autofocus
        :class="{ 'p-invalid': submitted && !product.idNumber }"
      />
      <small class="p-error" v-if="submitted && !product.idNumber"
        >idNumber is required.</small
      >
    </div>

    <div class="field col">
      <label for="brand">Značka</label>
      <InputText
        id="brand"
        required="true"
        v-model.trim="product.brand"
        autofocus
        :class="{ 'p-invalid': submitted && !product.brand }"
      />
      <small class="p-error" v-if="submitted && !product.brand"
        >Značka is required.</small
      >
    </div>

    <div class="field col">
      <label for="equipmentType">Typ nástroja</label>
      <InputText
        id="equipmentType"
        required="true"
        v-model.trim="product.equipmentType"
        autofocus
        :class="{ 'p-invalid': submitted && !product.equipmentType }"
      />
      <small class="p-error" v-if="submitted && !product.equipmentType"
        >Typ nástroja is required.</small
      >
    </div>

    <template #footer>
      <Button
        label="Ukonči"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialogEdit"
      />
      <Button
        label="Edituj"
        icon="pi pi-check"
        class="p-button-text"
        @click="handleEdit"
      /><Toast />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="deleteProductDialog"
    :style="{ width: '450px' }"
    header="Zmazanie"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="product"
        >Chceš zmazať záznam s ID číslom <b>{{ product.idNumber }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        label="Nie"
        icon="pi pi-times"
        class="p-button-text"
        @click="deleteProductDialog = false"
      />
      <Button
        label="Áno"
        icon="pi pi-check"
        class="p-button-text"
        @click="deleteProduct"
      />
      <Toast />
    </template>
  </Dialog>
</template>

<script>
import Api from "@/services/Api.js";

export default {
  data() {
    return {
      postDetails: [],
      submitted: false,
      productDialog: false,
      productDialogEdit: false,
      product: {},
      deleteProductDialog: false,
      idNumber: "",
      brand: "",
      equipmentType: "",
      filters: {},
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

    hideDialogEdit() {
      this.productDialogEdit = false;
      this.submitted = false;
    },

    handleSubmit() {
      this.submitted = true;
      if (
        this.product.idNumber.trim() &&
        this.product.brand.trim() &&
        this.product.equipmentType.trim()
      ) {
        Api.post("/equipment", {
          idNumber: this.product.idNumber,
          brand: this.product.brand,
          equipmentType: this.product.equipmentType,
        })
          .then((response) => {
            this.postDetails.push(response.data);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Product Created",
              life: 3000,
            });
          })
          .catch((error) => console.log(error));

        this.productDialog = false;
      }
    },

    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },

    deleteProduct() {
      this.postDetails = this.postDetails.filter(
        (val) => val.id !== this.product.id
      );

      Api.delete("equipment/" + this.product.id);
      this.deleteProductDialog = false;

      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Deleted",
        life: 3000,
      });
    },

    editProduct(product) {
      this.product = { ...product };
      this.productDialogEdit = true;
    },

    handleEdit() {
      this.submitted = true;

      if (
        this.product.idNumber.trim() &&
        this.product.brand.trim() &&
        this.product.equipmentType.trim()
      ) {
        if (this.product.id) {
          this.postDetails[this.findIndexById(this.product.id)] = this.product;
        }
        console.log(this.product);
      }
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Updated",
        life: 3000,
      });
    },

    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.postDetails.length; i++) {
        if (this.postDetails[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
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
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
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
}
</style>
