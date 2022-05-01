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
        <div class="text-left">
          <div class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText
              v-model="filters1['global'].value"
              placeholder="Global Search"
              size="100"
            />
          </div>
        </div>
      </template>
    </Toolbar>
    <DataTable
      :value="postDetails"
      :filters="filters1"
      filterMode="lenient"
      :scrollable="true"
      scrollHeight="70vh"
    >
      <Column field="id" header="ID" style="min-width: 1vh"></Column>
      <Column
        field="firstName"
        header="Krstné meno"
        style="min-width: 1vh"
        ;
      ></Column>
      <Column
        field="lastName"
        header="Priezvisko"
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
      <label for="firstName">Krstné meno</label>
      <InputText
        id="firstName"
        required="true"
        v-model.trim="product.firstName"
        autofocus
        :class="{ 'p-invalid': submitted && !product.firstName }"
      />
      <small class="p-error" v-if="submitted && !product.firstName"
        >firstName is required.</small
      >
    </div>

    <div class="field col">
      <label for="lastName">Priezvisko</label>
      <InputText
        id="lastName"
        required="true"
        v-model.trim="product.lastName"
        autofocus
        :class="{ 'p-invalid': submitted && !product.lastName }"
      />
      <small class="p-error" v-if="submitted && !product.lastName"
        >Značka is required.</small
      >
    </div>

    <template #footer>
      <Button
        label="Ukonči"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <Button
        label="Pridaj"
        icon="pi pi-check"
        class="p-button-text"
        @click="handleSubmit"
      /><Toast />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="deleteProductDialog"
    :style="{ width: '450px' }"
    header="Vymaž vybraný záznam"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="product"
        >Chceš vymazať záznam
        <b>{{ product.firstName + " " + product.lastName }}</b
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
      <label for="firstName">Krstné meno</label>
      <InputText
        id="firstName"
        required="true"
        v-model="product.firstName"
        autofocus
        :class="{ 'p-invalid': submitted && !product.firstName }"
      />
      <small class="p-error" v-if="submitted && !product.firstName"
        >Krstné meno je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="lastName">Značka</label>
      <InputText
        id="lastName"
        required="true"
        v-model.trim="product.lastName"
        autofocus
        :class="{ 'p-invalid': submitted && !product.lastName }"
      />
      <small class="p-error" v-if="submitted && !product.lastName"
        >Priezvisko je povinný údaj.</small
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
</template>

<script>
import Api from "@/services/Api.js";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      postDetails: null,
      submitted: false,
      productDialog: false,
      productDialogEdit: false,
      product: {},
      deleteProductDialog: false,
      idNumber: "",
      brand: "",
      equipmentType: "",
      filters1: {},
    };
  },
  created() {
    this.initFilters1();
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
      if (this.product.firstName.trim() && this.product.lastName.trim()) {
        Api.post("/employees", {
          firstName: this.product.firstName,
          lastName: this.product.lastName,
        })
          .then((response) => {
            this.postDetails.push(response.data);
            this.$toast.add({
              severity: "success",
              summary: "Úspech",
              detail: "Záznam bol vytvorený!",
              life: 1200,
            });
          })
          .catch((error) => console.log(error));
        setTimeout(() => {
          this.productDialog = false;
        }, 1200);
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

      Api.delete("employees/" + this.product.id);

      this.$toast.add({
        severity: "warn",
        summary: "Vymazané",
        detail: "Záznam bol vymazaný.",
        life: 1200,
      });
      setTimeout(() => {
        this.deleteProductDialog = false;
      }, 1200);
    },

    editProduct(product) {
      this.product = { ...product };
      this.productDialogEdit = true;
    },

    handleEdit() {
      this.submitted = true;

      if (this.product.firstName.trim() && this.product.lastName.trim());

      {
        if (this.product.id) {
          this.postDetails[this.findIndexById(this.product.id)] = this.product;
        }

        Api.put("employees/" + this.product.id, {
          id: this.product.id,
          firstName: this.product.firstName,
          lastName: this.product.lastName,
        }).catch((error) => console.log(error));
      }
      this.$toast.add({
        severity: "success",
        summary: "Úspech",
        detail: "Záznam bol editovaný!",
        life: 1200,
      });
      setTimeout(() => {
        this.productDialogEdit = false;
      }, 1200);
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
    initFilters1() {
      this.filters1 = {
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
  .p-filter-column {
    .p-multiselect,
    .p-dropdown,
    .p-inputtext {
      width: 100%;
    }
  }
}
</style>
