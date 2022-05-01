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
      <Column
        field="id"
        header="ID"
        style="min-width: 1vh"
        :sortable="true"
      ></Column>

      <Column
        field="brand"
        header="Značka"
        style="min-width: 1vh"
        :sortable="true"
      ></Column>

      <Column
        field="model"
        header="Model"
        style="min-width: 1vh"
        :sortable="true"
      ></Column
      ><Column
        field="year"
        header="Rok výroby"
        style="min-width: 1vh"
        :sortable="true"
      ></Column>
      <Column
        field="VIN"
        header="VIN číslo"
        style="min-width: 1vh"
        :sortable="true"
      ></Column>
      <Column
        field="lastService"
        header="Posledný servis"
        style="min-width: 1vh"
        :sortable="true"
      ></Column>
      <Column
        field="tireSize"
        header="Veľkosť pneumatík"
        style="min-width: 1vh"
        :sortable="true"
        ;
      ></Column>
      <Column header="Operácia" :exportable="false" style="min-width: 1vh">
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
      <label for="brand">Značka</label>
      <InputText
        id="brand"
        required="true"
        v-model.trim="product.brand"
        autofocus
        :class="{ 'p-invalid': submitted && !product.brand }"
      />
      <small class="p-error" v-if="submitted && !product.brand"
        >Značka je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="model">Model</label>
      <InputText
        id="model"
        required="true"
        v-model.trim="product.model"
        autofocus
        :class="{ 'p-invalid': submitted && !product.model }"
      />
      <small class="p-error" v-if="submitted && !product.model"
        >Model je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="year">Rok výroby</label>
      <InputText
        id="year"
        required="true"
        v-model.trim="product.year"
        autofocus
        :class="{ 'p-invalid': submitted && !product.year }"
      />
      <small class="p-error" v-if="submitted && !product.year"
        >Rok výroby je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="VIN">VIN číslo</label>
      <InputText
        id="VIN"
        required="true"
        v-model.trim="product.VIN"
        autofocus
        :class="{ 'p-invalid': submitted && !product.VIN }"
      />
      <small class="p-error" v-if="submitted && !product.VIN"
        >VIN je povinný údaj.</small
      >
    </div>
    <div class="field col">
      <label for="lastService">Posledný servis</label
      ><Calendar
        id="lastService"
        required="true"
        v-model="product.lastService"
        dateFormat="yy-mm-dd"
        autofocus
        :class="{ 'p-invalid': submitted && !product.lastService }"
      />
      <small class="p-error" v-if="submitted && !product.lastService"
        >Posledný servis je povinný údaj.</small
      >
    </div>
    <div class="field col">
      <label for="tireSize">Veľkosť pneumatík</label>
      <InputText
        id="tireSize"
        required="true"
        v-model.trim="product.tireSize"
        autofocus
        :class="{ 'p-invalid': submitted && !product.tireSize }"
      />
      <small class="p-error" v-if="submitted && !product.tireSize"
        >Veľkosť pneumatík je povinný údaj.</small
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
    header="Zmazanie"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="product"
        >Chceš vymazať záznam <b>{{ product.brand + " " + product.model }}</b
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
      <label for="brand">Značka</label>
      <InputText
        id="brand"
        required="true"
        v-model.trim="product.brand"
        autofocus
        :class="{ 'p-invalid': submitted && !product.brand }"
      />
      <small class="p-error" v-if="submitted && !product.brand"
        >Značka je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="model">Model</label>
      <InputText
        id="model"
        required="true"
        v-model.trim="product.model"
        autofocus
        :class="{ 'p-invalid': submitted && !product.model }"
      />
      <small class="p-error" v-if="submitted && !product.model"
        >Model je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="year">Rok výroby</label>
      <InputText
        id="year"
        required="true"
        v-model.trim="product.year"
        autofocus
        :class="{ 'p-invalid': submitted && !product.year }"
      />
      <small class="p-error" v-if="submitted && !product.year"
        >Rok výroby je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="VIN">VIN číslo</label>
      <InputText
        id="VIN"
        required="true"
        v-model.trim="product.VIN"
        autofocus
        :class="{ 'p-invalid': submitted && !product.VIN }"
      />
      <small class="p-error" v-if="submitted && !product.VIN"
        >VIN je povinný údaj.</small
      >
    </div>
    <div class="field col">
      <label for="lastService">Posledný servis</label>
      <InputText
        id="lastService"
        required="true"
        v-model.trim="product.lastService"
        autofocus
        :class="{ 'p-invalid': submitted && !product.lastService }"
      />
      <small class="p-error" v-if="submitted && !product.lastService"
        >Posledný servis je povinný údaj.</small
      >
    </div>
    <div class="field col">
      <label for="tireSize">Veľkosť pneumatík</label>
      <InputText
        id="tireSize"
        required="true"
        v-model.trim="product.tireSize"
        autofocus
        :class="{ 'p-invalid': submitted && !product.tireSize }"
      />
      <small class="p-error" v-if="submitted && !product.tireSize"
        >Veľkosť pneumatík je povinný údaj.</small
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
      Api.get("/vehicles").then((response) => {
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
      if (this.product.brand.trim() && this.product.model.trim()) {
        Api.post("/vehicles", {
          brand: this.product.brand,
          model: this.product.model,
          year: this.product.year,
          VIN: this.product.VIN,
          lastService: this.product.lastService,
          tireSize: this.product.tireSize,
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

      Api.delete("vehicles/" + this.product.id);

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

      if (this.product.brand.trim() && this.product.model.trim());

      {
        if (this.product.id) {
          this.postDetails[this.findIndexById(this.product.id)] = this.product;
        }

        Api.put("vehicles/" + this.product.id, {
          id: this.product.id,
          brand: this.product.brand,
          model: this.product.model,
          year: this.product.year,
          VIN: this.product.VIN,
          lastService: this.product.lastService,
          tireSize: this.product.tireSize,
        }).catch((error) => console.log(error));
      }
      this.$toast.add({
        severity: "success",
        summary: "Úspech",
        detail: "Záznam bol editovaný!",
        life: 3000,
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
