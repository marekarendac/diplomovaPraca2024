<template>
  <div class="card">
    <Toolbar class="mb-2">
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
              placeholder="Klikni a hľadaj"
              size="50"
            />
            <Button
              class="p-button-outlined ml-2"
              type="button"
              icon="pi pi-filter-slash"
              @click="clearFilter1()"
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
      scrollHeight="73vh"
    >
      <Column
        field="id"
        header="ID"
        style="max-width: 8%"
        :sortable="true"
      ></Column>
      <Column
        field="name"
        header="Meno"
        style="min-width: 1vh"
        :sortable="true"
        ;
      ></Column>
      <Column
        field="position"
        header="Pozícia"
        style="max-width: 13%"
        :sortable="true"
      ></Column>
      <Column
        field="phoneNumber"
        header="Telefón"
        style="min-width: 1vh"
        :sortable="true"
        ;
      ></Column>
      <Column
        field="contractType"
        header="Typ úväzku"
        style="min-width: 1vh"
        :sortable="true"
        ;
      ></Column
      ><Column
        field="healthExam"
        header="ZP"
        style="min-width: 1vh"
        :sortable="true"
        ;
      ></Column>

      <Column header="Operácia" :exportable="false" style="max-width: 14%">
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
      <label for="name">Meno</label>
      <InputText
        id="name"
        required="true"
        v-model.trim="product.name"
        autofocus
        :class="{ 'p-invalid': submitted && !product.name }"
      />
      <small class="p-error" v-if="submitted && !product.name"
        >Meno je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="phoneNumber">Telefón</label>
      <InputText
        id="phoneNumber"
        required="true"
        v-model.trim="product.phoneNumber"
        autofocus
        :class="{ 'p-invalid': submitted && !product.phoneNumber }"
      />
      <small class="p-error" v-if="submitted && !product.phoneNumber"
        >Telefón je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="position">Pozícia</label>
      <Dropdown
        id="position"
        required="true"
        :options="positions"
        optionLabel="position"
        v-model="product.position"
        autofocus
        :class="{ 'p-invalid': submitted && !product.position }"
      />
      <small class="p-error" v-if="submitted && !product.position"
        >Pozícia je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="contractType">Typ úväzku</label>
      <Dropdown
        id="contractType"
        required="true"
        :options="contracts"
        optionLabel="contractType"
        v-model="product.contractType"
        autofocus
        :class="{ 'p-invalid': submitted && !product.contractType }"
      />
      <small class="p-error" v-if="submitted && !product.contractType"
        >Typ úväzku je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="healthExam">Zdravotná prehliadka</label>
      <Calendar
        showIcon
        id="healthExam"
        required="true"
        v-model="product.healthExam"
        autofocus
        :class="{ 'p-invalid': submitted && !product.healthExam }"
      />
      <small class="p-error" v-if="submitted && !product.healthExam"
        >Zdravotná prehliadka je povinný údaj.</small
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
        >Chceš vymazať záznam <b>{{ product.name }}</b
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
      <label for="name">Meno</label>
      <InputText
        id="name"
        required="true"
        v-model.trim="product.name"
        autofocus
        :class="{ 'p-invalid': submitted && !product.name }"
      />
      <small class="p-error" v-if="submitted && !product.name"
        >Meno je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="healthExam">Zdravotná prehliadka</label>
      <Calendar
        showIcon
        id="healthExam"
        required="true"
        v-model="product.healthExam"
        autofocus
        :class="{ 'p-invalid': submitted && !product.healthExam }"
      />
      <small class="p-error" v-if="submitted && !product.healthExam"
        >Zdravotná prehliadka je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="phoneNumber">Telefón</label>
      <InputText
        id="phoneNumber"
        required="true"
        v-model.trim="product.phoneNumber"
        autofocus
        :class="{ 'p-invalid': submitted && !product.phoneNumber }"
      />
      <small class="p-error" v-if="submitted && !product.phoneNumber"
        >Telefón je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="position">Pozícia</label>
      <InputText
        id="position"
        required="true"
        :options="positions"
        optionLabel="position"
        v-model="product.position"
        autofocus
        :class="{ 'p-invalid': submitted && !product.position }"
      />
      <small class="p-error" v-if="submitted && !product.position"
        >Pozícia je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="contractType">Typ úväzku</label>
      <InputText
        id="contractType"
        required="true"
        :options="contracts"
        optionLabel="contractType"
        v-model="product.contractType"
        autofocus
        :class="{ 'p-invalid': submitted && !product.contractType }"
      />
      <small class="p-error" v-if="submitted && !product.contractType"
        >Typ úväzku je povinný údaj.</small
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
      name: "",
      healthExam: "",
      position: "",
      contractType: "",
      phoneNumber: "",
      filters1: {},
      positions: [{ position: "Majster" }, { position: "Pracovník" }],
      contracts: [
        { contractType: "Zamestnanec" },
        { contractType: "Živnostník" },
      ],
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
    clearFilter1() {
      this.initFilters1();
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
      if (this.product.name.trim()) {
        Api.post("/employees", {
          name: this.product.name,
          position: this.product.position.position,
          phoneNumber: this.product.phoneNumber,
          contractType: this.product.contractType.contractType,
          healthExam: this.product.healthExam,
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
      const updatedEmployee = {
        ...this.product,
        position: this.product.position.position,
        contractType: this.product.contractType.contractType,
      };
      Api.put("employees/" + this.product.id, updatedEmployee)
        .then(() => {
          if (this.product.id) {
            this.postDetails[this.findIndexById(this.product.id)] =
              updatedEmployee;
          }
          this.$toast.add({
            severity: "success",
            summary: "Úspech",
            detail: "Záznam bol editovaný!",
            life: 1200,
          });
        })
        .catch((error) => console.log(error));

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
