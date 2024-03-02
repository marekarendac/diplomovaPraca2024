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
      <template #end>
        <Button
          label="Export tabuľky"
          icon="pi pi-external-link"
          @click="exportEmployees"
        />
      </template>
    </Toolbar>
    <DataTable
      :value="postDetails"
      :filters="filters1"
      sortField="healthExam"
      :sortOrder="1"
      filterMode="lenient"
      :scrollable="true"
      scrollHeight="72vh"
    >
      <Column field="fullName" header="Meno" :sortable="true"></Column>
      <Column field="position" header="Pozícia" :sortable="true"></Column>
      <Column
        field="contractType"
        header="Typ úväzku"
        :sortable="true"
      ></Column>
      <Column
        field="email"
        header="Email"
        :sortable="true"
        style="min-width: 230px"
      ></Column
      ><Column field="phoneNumber" header="Telefón" :sortable="true"></Column
      ><Column field="healthExam" header="ZP" :sortable="true"></Column>

      <Column header="Operácie" :exportable="false" style="max-width: 13%">
        <template #body="slotProps">
          <Button
            icon="pi pi-eye"
            class="p-button-rounded mr-1"
            @click="showProduct(slotProps.data)"
          />

          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-1"
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
    v-model:visible="showProductDialog"
    :style="{ width: '450px' }"
    header="Zobraziť záznam"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="name">Meno</label
      ><AutoComplete id="name" v-model.trim="product.name" disabled />
    </div>
    <div class="field col">
      <label for="surname">Priezvisko</label
      ><AutoComplete id="surname" v-model.trim="product.surname" disabled />
    </div>
    <div class="field col">
      <label for="phoneNumber">Telefón</label
      ><AutoComplete
        id="phoneNumber"
        v-model.trim="product.phoneNumber"
        disabled
      />
    </div>
    <div class="field col">
      <label for="position">Pozícia</label
      ><AutoComplete id="position" v-model.trim="product.position" disabled />
    </div>
    <div class="field col">
      <label for="contractType">Typ úväzku</label
      ><AutoComplete
        id="contractType"
        v-model.trim="product.contractType"
        disabled
      />
    </div>
    <div class="field col">
      <label for="healthExam">Zdravotná prehliadka</label
      ><AutoComplete
        id="healthExam"
        v-model.trim="product.healthExam"
        disabled
      />
    </div>
    <div class="field col">
      <label for="documentNumber">Číslo OP</label
      ><AutoComplete
        id="documentNumber"
        v-model.trim="product.documentNumber"
        disabled
      />
    </div>
    <div class="field col">
      <label for="email">Email</label
      ><AutoComplete id="email" v-model.trim="product.email" disabled />
    </div>
    <div class="field col">
      <label for="iban">IBAN</label
      ><AutoComplete id="iban" v-model.trim="product.iban" disabled />
    </div>
    <div class="field col">
      <label for="wage">Hodinová mzda</label
      ><AutoComplete id="wage" v-model.trim="product.wage" disabled />
    </div>
    <template #footer>
      <Button
        label="Ukonči"
        icon="pi pi-times"
        class="p-button-text"
        @click="showProductDialog = false"
      />
    </template>
  </Dialog>

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
        <InputMask
          id="phoneNumber"
          required="true"
          v-model="product.phoneNumber"
          mask="+421999999999"
          placeholder="+421 000 000 000"
          autofocus
          :class="{ 'p-invalid': submitted && !product.phoneNumber }"
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

    <div class="field col">
      <label for="documentNumber">Číslo OP</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="documentNumber"
          required="true"
          v-model="product.documentNumber"
          mask="aa999999"
          placeholder="XX112233"
          autofocus
          :class="{ 'p-invalid': submitted && !product.documentNumber }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.documentNumber"
        >Číslo OP je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="email">Email</label>
      <div style="display: flex; align-items: center">
        <InputText
          id="email"
          required="true"
          v-model="product.email"
          @input="removeWhitespace('email')"
          autofocus
          :class="{ 'p-invalid': submitted && !product.email }"
          :maxlength="45"
          placeholder="user@email.com"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.email"
        >Email je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="iban">IBAN</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="iban"
          required="true"
          v-model="product.iban"
          mask="SK99999999999999999999"
          placeholder="SK00001111222233334444"
          autofocus
          :class="{ 'p-invalid': submitted && !product.iban }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.iban"
        >IBAN je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="wage">Hodinová mzda</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="wage"
          required="true"
          v-model="product.wage"
          mask="99.9"
          placeholder="00.0"
          autofocus
          :class="{ 'p-invalid': submitted && !product.wage }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.wage"
        >Mzda je povinný údaj.</small
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
      <b>Chceš vymazať tento záznam ?</b>
      <div style="text-align: center">
        <InputGroup>
          <InputGroupAddon class="icon-addon">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <AutoComplete
            id="name"
            v-model.trim="product.fullName"
            disabled
          /><br />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="icon-addon">
            <i class="pi pi-phone"></i>
          </InputGroupAddon>
          <AutoComplete
            id="name"
            v-model.trim="product.phoneNumber"
            disabled
          /><br />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="icon-addon">
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <AutoComplete
            id="name"
            v-model.trim="product.documentNumber"
            disabled
          />
        </InputGroup>
      </div>
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
        <InputMask
          id="phoneNumber"
          required="true"
          v-model="product.phoneNumber"
          mask="+421999999999"
          placeholder="+421 000 000 000"
          autofocus
          :class="{ 'p-invalid': submitted && !product.phoneNumber }"
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
      <label for="documentNumber">Číslo OP</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="documentNumber"
          required="true"
          v-model="product.documentNumber"
          mask="aa999999"
          placeholder="XX112233"
          autofocus
          :class="{ 'p-invalid': submitted && !product.documentNumber }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.documentNumber"
        >Číslo OP je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="email">Email</label>
      <div style="display: flex; align-items: center">
        <InputText
          id="email"
          required="true"
          v-model="product.email"
          @input="removeWhitespace('email')"
          autofocus
          :class="{ 'p-invalid': submitted && !product.email }"
          :maxlength="45"
          placeholder="user@email.com"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.email"
        >Email je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="iban">IBAN</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="iban"
          required="true"
          v-model="product.iban"
          mask="SK99999999999999999999"
          placeholder="SK00001111222233334444"
          autofocus
          :class="{ 'p-invalid': submitted && !product.iban }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.iban"
        >IBAN je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="wage">Hodinová mzda</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="wage"
          required="true"
          v-model="product.wage"
          mask="99.9"
          placeholder="00.0"
          autofocus
          :class="{ 'p-invalid': submitted && !product.wage }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.wage"
        >Mzda je povinný údaj.</small
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
      showProductDialog: false,
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
      documentNumber: "",
      email: "",
      iban: "",
      wage: "",
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
          phoneNumber: this.product.phoneNumber,
          contractType: this.product.contractType.contractType,
          healthExam: this.product.healthExam,
          documentNumber: this.product.documentNumber,
          email: this.product.email,
          iban: this.product.iban,
          wage: this.product.wage,
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
              life: 800,
            });
          })
          .catch((error) => console.log(error));

        setTimeout(() => {
          this.productDialog = false;
        }, 800);
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
        life: 800,
      });
      setTimeout(() => {
        this.deleteProductDialog = false;
      }, 800);
    },

    showProduct(product) {
      this.product = product;
      this.showProductDialog = true;
    },

    editProduct(product) {
      this.product = { ...product };
      this.product.position = product.position.position;
      this.product.contractType = product.contractType.contractType;
      this.productDialogEdit = true;
    },
    handleEdit() {
      this.submitted = true;
      const updatedEmployee = {
        ...this.product,
        position: this.product.position.position,
        contractType: this.product.contractType.contractType,
        phoneNumber: this.product.phoneNumber,
        healthExam: this.product.healthExam.toISOString().split("T")[0], // format the date
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
            life: 800,
          });
        })
        .catch((error) => console.log(error));

      setTimeout(() => {
        this.productDialogEdit = false;
      }, 800);
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
    exportEmployees() {
      if (window.confirm("Do you really want to download the file?")) {
        console.log("exportEmployees called");
        Api.get("/exportEmployees", {
          responseType: "blob", // Important for handling the binary data
        })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            const contentDisposition = response.headers["content-disposition"];
            let fileName = "employees.xlsx"; // default filename
            if (contentDisposition) {
              const fileNameMatch = contentDisposition.match(
                /filename="?([^"]+)"?\b/
              );
              if (fileNameMatch && fileNameMatch[1])
                fileName = fileNameMatch[1];
            }
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
<style scoped>
:deep() .icon-addon {
  margin-right: 10px; /* adjust as needed */
}
</style>
