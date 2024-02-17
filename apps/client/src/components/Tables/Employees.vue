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
      scrollHeight="72vh"
    >
      <Column
        field="id"
        header="ID"
        style="max-width: 8%"
        :sortable="true"
      ></Column>

      <Column
        field="fullName"
        header="Meno"
        style="min-width: 1vh"
        :sortable="true"
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
      ></Column>
      <Column
        field="contractType"
        header="Typ úväzku"
        style="min-width: 1vh"
        :sortable="true"
      ></Column>
      <Column
        field="healthExam"
        header="ZP"
        style="min-width: 1vh"
        :sortable="true"
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
        maxlength="20"
        placeholder="Krstné meno"
      />
      <small class="p-error" v-if="submitted && !product.name"
        >Meno je povinný údaj.</small
      >
    </div>
    <div class="field col">
      <label for="surname">Priezvisko</label>
      <InputText
        id="surname"
        required="true"
        v-model.trim="product.surname"
        autofocus
        :class="{ 'p-invalid': submitted && !product.surname }"
        maxlength="20"
        placeholder="Priezvisko"
      />
      <small class="p-error" v-if="submitted && !product.surname"
        >Priezvisko je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="phoneNumber">Telefón</label>
      <div style="display: flex; align-items: center">
        <span>+421</span>
        <InputText
          id="phoneNumber"
          required="true"
          v-model="product.phoneNumber"
          @input="removeWhitespace('phoneNumber')"
          autofocus
          :class="{ 'p-invalid': submitted && !product.phoneNumber }"
          :maxlength="9"
          placeholder="9 čísel bez medzier"
        />
      </div>
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
        maxlength="20"
        placeholder="Krstné meno"
      />
      <small class="p-error" v-if="submitted && !product.name"
        >Meno je povinný údaj.</small
      >
    </div>
    <div class="field col">
      <label for="surname">Priezvisko</label>
      <InputText
        id="surname"
        required="true"
        v-model.trim="product.surname"
        autofocus
        :class="{ 'p-invalid': submitted && !product.surname }"
        maxlength="20"
        placeholder="Priezvisko"
      />
      <small class="p-error" v-if="submitted && !product.surname"
        >Priezvisko je povinný údaj.</small
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
      <div style="display: flex; align-items: center">
        <span>+421</span>
        <InputText
          id="phoneNumber"
          required="true"
          v-model="phoneNumberWithoutPrefix"
          @input="removeWhitespace('phoneNumber')"
          autofocus
          :class="{ 'p-invalid': submitted && !product.phoneNumber }"
          :maxlength="9"
          placeholder="9 čísel bez medzier"
        />
      </div>
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
      surname: "",
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
  computed: {
    phoneNumberWithoutPrefix: {
      get() {
        return this.product.phoneNumber.slice(4);
      },
      set(newValue) {
        this.product.phoneNumber = "+421" + newValue;
      },
    },
  },
  methods: {
    getPostDetails() {
      Api.get("/employees").then((response) => {
        this.postDetails = response.data.map((employee) => ({
          ...employee,
          fullName: `${employee.name} ${employee.surname}`,
        }));
      });
    },

    clearFilter1() {
      this.initFilters1();
    },
    openNew() {
      this.product = {};
      this.product.position = this.positions[1]; // pre-set to the second position
      this.product.contractType = this.contracts[1]; // pre-set to the second position
      this.product.healthExam = new Date().toISOString().slice(0, 10); // pre-set to today's date
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
        const data = {
          name: this.product.name,
          surname: this.product.surname,
          position: this.product.position.position,
          phoneNumber: "+421" + this.product.phoneNumber,
          contractType: this.product.contractType.contractType,
          healthExam: this.product.healthExam,
        };

        Api.post("/employees", data)
          .then((response) => {
            const newEmployee = {
              ...response.data,
              fullName: `${response.data.name} ${response.data.surname}`,
            };

            this.postDetails.push(newEmployee);

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
        contractType: this.product.contractType,
        phoneNumber: "+421" + this.phoneNumberWithoutPrefix,
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
    removeWhitespace(field) {
      this.product[field] = this.product[field].replace(/\s/g, "");
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
