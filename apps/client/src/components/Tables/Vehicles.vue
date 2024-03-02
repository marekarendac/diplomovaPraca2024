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
          @click="exportVehicles"
        />
      </template>
    </Toolbar>
    <DataTable
      :value="postDetails"
      :filters="filters1"
      filterMode="lenient"
      :scrollable="true"
      scrollHeight="72vh"
    >
      <Column field="brand" header="Značka" :sortable="true"></Column>

      <Column field="model" header="Model" :sortable="true"></Column
      ><Column field="year" header="Rok" :sortable="true"></Column>
      <Column
        field="VIN"
        header="VIN číslo"
        :sortable="true"
        style="min-width: 230px"
      ></Column
      ><Column field="tireSize" header="Pneumatiky" :sortable="true" ;></Column>
      <Column field="lastService" header="Servis" :sortable="true"></Column>

      <Column header="Operácia" :exportable="false" style="max-width: 13%">
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
      <label for="brand">Značka</label
      ><AutoComplete id="brand" v-model.trim="product.brand" disabled />
    </div>

    <div class="field col">
      <label for="model">Model</label
      ><AutoComplete id="model" v-model.trim="product.model" disabled />
    </div>

    <div class="field col">
      <label for="year">Rok výroby</label
      ><AutoComplete id="year" v-model.trim="product.year" disabled />
    </div>

    <div class="field col">
      <label for="VIN">VIN číslo</label
      ><AutoComplete id="VIN" v-model.trim="product.VIN" disabled />
    </div>

    <div class="field col">
      <label for="tireSize">Veľkosť pneumatík</label
      ><AutoComplete id="tireSize" v-model.trim="product.tireSize" disabled />
    </div>

    <div class="field col">
      <label for="lastService">Posledný servis</label
      ><AutoComplete
        id="lastService"
        v-model.trim="product.lastService"
        disabled
      />
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
      <label for="brand">Značka</label>
      <InputText
        id="brand"
        required="true"
        v-model.trim="product.brand"
        autofocus
        :class="{ 'p-invalid': submitted && !product.brand }"
        maxlength="20"
        placeholder="Značka vozidla"
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
        maxlength="30"
        placeholder="Model vozidla"
      />
      <small class="p-error" v-if="submitted && !product.model"
        >Model je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="year">Rok výroby</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="year"
          required="true"
          v-model="product.year"
          mask="9999"
          placeholder="2024"
          autofocus
          :class="{ 'p-invalid': submitted && !product.year }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.year"
        >Rok výroby je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="VIN">VIN číslo</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="VIN"
          required="true"
          v-model="product.VIN"
          mask="*****************"
          placeholder="XXXXXXXXXXXXXXXXX"
          autofocus
          :class="{ 'p-invalid': submitted && !product.VIN }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.VIN"
        >VIN číslo je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="tireSize">Veľkosť pneumatík</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="tireSize"
          required="true"
          v-model="product.tireSize"
          mask="999x99xR99"
          placeholder="999x99xR99"
          autofocus
          :class="{ 'p-invalid': submitted && !product.tireSize }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.tireSize"
        >Veľkosť pneumatík je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="lastService">Posledný servis</label
      ><Calendar
        showIcon
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
            <i class="pi pi-car"></i>
          </InputGroupAddon>
          <AutoComplete
            id="brand"
            v-model.trim="brandAndModel"
            disabled
          /><br />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="icon-addon">
            <i class="pi pi-calendar"></i>
          </InputGroupAddon>
          <AutoComplete id="year" v-model.trim="product.year" disabled /><br />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="icon-addon">
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <AutoComplete id="VIN" v-model.trim="product.VIN" disabled />
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
      <label for="brand">Značka</label>
      <InputText
        id="brand"
        required="true"
        v-model.trim="product.brand"
        autofocus
        :class="{ 'p-invalid': submitted && !product.brand }"
        maxlength="20"
        placeholder="Značka vozidla"
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
        maxlength="30"
        placeholder="Model vozidla"
      />
      <small class="p-error" v-if="submitted && !product.model"
        >Model je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="lastService">Posledný servis</label
      ><Calendar
        showIcon
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
      <label for="year">Rok výroby</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="year"
          required="true"
          v-model="product.year"
          mask="9999"
          placeholder="2024"
          autofocus
          :class="{ 'p-invalid': submitted && !product.year }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.year"
        >Rok výroby je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="VIN">VIN číslo</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="VIN"
          required="true"
          v-model="product.VIN"
          mask="*****************"
          placeholder="XXXXXXXXXXXXXXXXX"
          autofocus
          :class="{ 'p-invalid': submitted && !product.VIN }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.VIN"
        >VIN číslo je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="tireSize">Veľkosť pneumatík</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="tireSize"
          required="true"
          v-model="product.tireSize"
          mask="999x99xR99"
          placeholder="999x99xR99"
          autofocus
          :class="{ 'p-invalid': submitted && !product.tireSize }"
        />
      </div>
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
      showProductDialog: false,
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

    showProduct(product) {
      this.product = product;
      this.showProductDialog = true;
    },

    editProduct(product) {
      this.product = { ...product };
      this.productDialogEdit = true;
    },

    handleEdit() {
      this.submitted = true;

      if (this.product.brand.trim() && this.product.model.trim());

      {
        this.product.lastService = this.product.lastService
          .toISOString()
          .split("T")[0]; // format the date

        if (this.product.id) {
          this.postDetails[this.findIndexById(this.product.id)] = this.product;
        }

        Api.put("vehicles/" + this.product.id, {
          id: this.product.id,
          brand: this.product.brand,
          model: this.product.model,
          year: this.product.year,
          VIN: this.product.VIN,
          lastService: this.product.lastService, // already formatted
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
    clearFilter1() {
      this.initFilters1();
    },
    exportVehicles() {
      if (window.confirm("Do you really want to download the file?")) {
        console.log("exportVehicles called");
        Api.get("/exportVehicles", {
          responseType: "blob", // Important for handling the binary data
        })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            const contentDisposition = response.headers["content-disposition"];
            let fileName = "vehicles.xlsx"; // default filename
            if (contentDisposition) {
              const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
              if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
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
  computed: {
    brandAndModel: {
      get() {
        return this.product.brand + " " + this.product.model;
      },
      set(value) {
        const parts = value.split(" ");
        this.product.brand = parts[0];
        this.product.model = parts.slice(1).join(" ");
      },
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
