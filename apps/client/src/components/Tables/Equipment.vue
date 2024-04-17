<template>
  <div class="card">
    <Toolbar class="mb-2">
      <template #start>
        <Button
          label="Nový"
          icon="pi pi-plus"
          class="p-button-rounded p-button-success mr-2 p-button-raised"
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
          @click="exportEquipment"
          class="p-button-rounded p-button-secondary p-button-raised p-button-outlined mr-2"
        />
      </template>
    </Toolbar>
    <DataTable
      :value="postDetails"
      :filters="filters1"
      removableSort
      filterMode="lenient"
      :scrollable="true"
      style="min-height: 100vh"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column
        field="idNumber"
        header="ID číslo"
        style="max-width: 120px"
        :sortable="true"
        ;
      ></Column>

      <Column field="brand" header="Značka" :sortable="true"></Column>

      <Column
        field="equipmentType"
        header="Typ nástroja"
        :sortable="true"
      ></Column>
      <Column
        field="description"
        header="Popis"
        style="min-width: 300px"
        :sortable="true"
      ></Column
      ><Column field="status" header="Stav" :sortable="true"></Column>
      <Column field="warranty" header="Záruka" :sortable="true"></Column>

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
    :style="{ width: '43%' }"
    header="Zobraziť záznam"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="id"># Interné číslo</label
      ><AutoComplete id="name" v-model.trim="product.id" disabled />
    </div>

    <div class="field col">
      <label for="idNumber">ID číslo</label
      ><AutoComplete id="idNumber" v-model.trim="product.idNumber" disabled />
    </div>

    <div class="field col">
      <label for="brand">Značka</label
      ><AutoComplete id="brand" v-model.trim="product.brand" disabled />
    </div>

    <div class="field col">
      <label for="equipmentType">Typ nástroja</label
      ><AutoComplete
        id="equipmentType"
        v-model.trim="product.equipmentType"
        disabled
      />
    </div>

    <div class="field col">
      <label for="warranty">Záruka</label
      ><AutoComplete id="warranty" v-model.trim="product.warranty" disabled />
    </div>

    <div class="field col">
      <label for="description">Popis nástroja</label
      ><AutoComplete
        id="description"
        v-model.trim="product.description"
        disabled
      />
    </div>

    <div class="field col">
      <label for="status">Stav nástroja</label
      ><AutoComplete id="status" v-model.trim="product.status" disabled />
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
    :style="{ width: '43%' }"
    header="Pridaj nový záznam"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="idNumber">Identifikačné číslo</label>
      <InputMask
        id="idNumber"
        required="true"
        v-model="product.idNumber"
        mask="9999"
        placeholder="0000"
        autofocus
        :class="{ 'p-invalid': submitted && !product.idNumber }"
      />
      <small class="p-error" v-if="submitted && !product.idNumber"
        >idNumber je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="brand">Značka</label>
      <InputText
        id="brand"
        required="true"
        v-model.trim="product.brand"
        placeholder="Značka nástroja"
        autofocus
        :class="{ 'p-invalid': submitted && !product.brand }"
      />
      <small class="p-error" v-if="submitted && !product.brand"
        >Značka je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="equipmentType">Typ nástroja</label>
      <Dropdown
        id="equipmentType"
        v-model="product.equipmentType"
        :options="equipmentTypes"
        optionLabel="equipmentType"
        optionValue="equipmentType"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !product.equipmentType }"
        placeholder="Vyber typ nástroja"
      />
      <small class="p-error" v-if="submitted && !product.equipmentType"
        >Typ nástroja je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="description">Popis nástroja</label>
      <Textarea
        id="description"
        required="true"
        v-model.trim="product.description"
        autofocus
        autoResize
        maxlength="245"
        placeholder="Popis nástroja..."
        :class="{ 'p-invalid': submitted && !product.description }"
      />
      <small class="p-error" v-if="submitted && !product.description"
        >Popis je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="status">Typ nástroja</label>
      <Dropdown
        id="status"
        v-model="product.status"
        :options="statuses"
        optionLabel="status"
        optionValue="status"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !product.status }"
        placeholder="Vyber typ nástroja"
      />
      <small class="p-error" v-if="submitted && !product.status"
        >Stav nástroja je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="warranty">Záruka</label>
      <Calendar
        showIcon
        id="warranty"
        required="true"
        v-model="product.warranty"
        dateFormat="yy-mm-dd"
        autofocus
        :class="{ 'p-invalid': submitted && !product.warranty }"
      />
      <small class="p-error" v-if="submitted && !product.warranty"
        >Záruka je povinné pole.</small
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
    :style="{ width: '43%' }"
    header="Vymaž vybraný záznam"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <b>Chceš vymazať tento záznam ?</b>
      <div class="text-align-center">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-info-circle"></i>
          </span>
          <InputText
            id="idNumber"
            v-model.trim="product.idNumber"
            readonly
          /><br />
        </div>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-tag"></i>
          </span>
          <InputText id="brand" v-model.trim="product.brand" readonly /><br />
        </div>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-info"></i>
          </span>
          <InputText
            id="equipmentType"
            v-model.trim="product.equipmentType"
            readonly
          /><br />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-cog"></i>
          </span>
          <InputText id="status" v-model.trim="product.status" readonly /><br />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-calendar-times"></i>
          </span>
          <InputText id="warranty" v-model.trim="product.warranty" readonly />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-calendar-times"></i>
          </span>
          <InputText
            id="description"
            v-model.trim="product.description"
            readonly
          />
        </div>
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
    :style="{ width: '43%' }"
    header="Edituj vybraný záznam"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="idNumber">Identifikačné číslo</label>
      <InputMask
        id="idNumber"
        required="true"
        v-model="product.idNumber"
        mask="9999"
        placeholder="0000"
        autofocus
        :class="{ 'p-invalid': submitted && !product.idNumber }"
      />
      <small class="p-error" v-if="submitted && !product.idNumber"
        >idNumber je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="brand">Značka</label>
      <InputText
        id="brand"
        required="true"
        v-model.trim="product.brand"
        placeholder="Značka nástroja"
        autofocus
        :class="{ 'p-invalid': submitted && !product.brand }"
      />
      <small class="p-error" v-if="submitted && !product.brand"
        >Značka je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="equipmentType">Typ nástroja</label>
      <Dropdown
        id="equipmentType"
        v-model="product.equipmentType"
        :options="equipmentTypes"
        optionLabel="equipmentType"
        optionValue="equipmentType"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !product.equipmentType }"
        placeholder="Vyber typ nástroja"
      />
      <small class="p-error" v-if="submitted && !product.equipmentType"
        >Typ nástroja je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="status">Stav nástroja</label>
      <Dropdown
        id="status"
        :options="statuses"
        optionLabel="status"
        optionValue="status"
        required="true"
        v-model="product.status"
        autofocus
        :class="{ 'p-invalid': submitted && !product.status }"
      />
      <small class="p-error" v-if="submitted && !product.status"
        >Stav je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="description">Popis nástroja</label>
      <Textarea
        id="description"
        required="true"
        v-model.trim="product.description"
        autofocus
        autoResize
        maxlength="245"
        placeholder="Popis nástroja..."
        :class="{ 'p-invalid': submitted && !product.description }"
      />
      <small class="p-error" v-if="submitted && !product.description"
        >Popis je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="warranty">Záruka</label>
      <Calendar
        showIcon
        id="warranty"
        required="true"
        v-model="product.warranty"
        dateFormat="yy-mm-dd"
        autofocus
        :class="{ 'p-invalid': submitted && !product.warranty }"
      />
      <small class="p-error" v-if="submitted && !product.warranty"
        >Záruka je povinné pole.</small
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
      equipmentType: null,
      description: "",
      statuses: [
        { status: "Záruka" },
        { status: "OK" },
        { status: "Pokazené" },
      ],
      filters1: {},
      equipmentTypes: [
        { equipmentType: "Vŕtačka" },
        { equipmentType: "AKU vŕtačka" },
        { equipmentType: "Zváračka" },
        { equipmentType: "Karbobrúska" },
      ],
      warranty: "",
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
      if (this.product.brand.trim()) {
        Api.post("/equipment", {
          idNumber: this.product.idNumber,
          brand: this.product.brand,
          equipmentType: this.product.equipmentType,
          description: this.product.description,
          status: this.product.status,
          warranty: this.product.warranty,
        })
          .then((response) => {
            this.postDetails.push(response.data);
            this.$toast.add({
              severity: "success",
              summary: "Úspech",
              detail: "Záznam bol vytvorený!",
              life: 800,
            });
            setTimeout(() => {
              this.productDialog = false;
            }, 800);
          })
          .catch((error) => console.log(error));
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

    editProduct(product) {
      this.product = { ...product };
      this.productDialogEdit = true;
    },

    showProduct(product) {
      this.product = product;
      this.showProductDialog = true;
    },

    handleEdit() {
      this.submitted = true;

      let warrantyDate = this.product.warranty;
      if (typeof this.product.warranty === "string") {
        warrantyDate = new Date(this.product.warranty);
      }

      const updatedEquipment = {
        ...this.product,
        equipmentType: this.product.equipmentType, // assuming equipmentType is a Proxy object with a type property
        status: this.product.status, // assuming status is a Proxy object with a status property
        warranty: warrantyDate
          ? warrantyDate.toISOString().split("T")[0]
          : null, // format the date
      };

      Api.put("equipment/" + this.product.id, updatedEquipment)
        .then(() => {
          if (this.product.id) {
            this.postDetails[this.findIndexById(this.product.id)] =
              updatedEquipment;
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
    clearFilter1() {
      this.initFilters1();
    },

    exportEquipment() {
      if (window.confirm("Do you really want to download the file?")) {
        console.log("exportVehicles called");
        Api.get("/exportEquipment", {
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

  .p-filter-column {
    .p-multiselect,
    .p-dropdown,
    .p-inputtext {
      width: 100%;
    }
  }
}

:deep() .icon-addon {
  margin-right: 10px; /* adjust as needed */
}

.p-inputgroup .p-inputtext[readonly] {
  pointer-events: none;
  background-color: #f5f5f5; /* adjust as needed */
}

.p-inputgroup {
  margin-bottom: 5px; /* adjust as needed */
}

.text-align-center {
  margin-top: 7px; /* adjust as needed */
}

.p-datatable .p-datatable-thead > tr > th {
  z-index: 0;
}
</style>
