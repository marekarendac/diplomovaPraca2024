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
          label="Uprav skupinu"
          icon="pi pi-pencil"
          class="p-button-rounded p-button mr-1"
          @click="editProduct"
        />

        <Button
          label="Vymaž skupinu"
          icon="pi pi-trash"
          class="p-button-rounded p-button-warning mr-1"
          @click="confirmDeleteProduct"
        />
      </template>
    </Toolbar>
    <DataTable
      :value="mappedPostDetails"
      rowGroupMode="rowspan"
      groupRowsBy="workGroup"
      sortMode="single"
      sortField="workGroup"
      :sortOrder="1"
      style="min-height: 100vh"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column
        field="workGroup"
        header="Pracovná skupina"
        style="max-width: 100px"
      ></Column>
      <Column field="employeeId" header="#"></Column>
      <Column field="employeeFullName" header="Meno"></Column>
      <Column field="employeePosition" header="Pozícia"></Column>
      <Column field="employeePhoneNumber" header="Telefón"></Column>
      <Column field="employeeHealthExam" header="ZP"></Column>
    </DataTable>
  </div>

  <Dialog
    @submit.prevent="handleSubmit"
    v-model:visible="productDialog"
    :style="{ width: '550px' }"
    header="Pridaj novú pracovnú skupinu"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="workGroup">Pracovná skupina</label>
      <div style="display: flex; align-items: center">
        <InputText
          id="workGroup"
          required="true"
          v-model.trim="product.workGroup"
          placeholder="Názov novej pracovnej skupiny"
          autofocus
          :class="{ 'p-invalid': submitted && !product.workGroup }"
        />
        <small class="p-error" v-if="submitted && !product.workGroup"
          >Názov pracovnej skupiny je povinné pole.</small
        >
      </div>
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
    v-model:visible="productDialogEdit"
    :style="{ width: '450px' }"
    header="Edituj skupinu"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="name">Pracovná skupina</label>
      <div style="display: flex; align-items: center">
        <Dropdown
          v-model="name"
          :options="workGroups"
          optionLabel="name"
          placeholder="Zadaj meno zamestnanca"
          style="width: 100%"
        >
        </Dropdown>
      </div>
    </div>

    <div class="field col">
      <label for="phoneNumber">Zamestnanec</label>
      <div style="display: flex; align-items: center">
        <Dropdown
          v-model="employeeFullName"
          :options="groupedEmployees"
          optionLabel="label"
          filter
          optionGroupLabel="label"
          optionGroupChildren="items"
          placeholder="Zadaj meno zamestnanca"
          style="width: 100%"
        >
          <template #optiongroup="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.label }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
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
    async getPostDetails() {
      const [
        employeeWorkGroupsResponse,
        employeesResponse,
        workGroupsResponse,
      ] = await Promise.all([
        Api.get("/employeeWorkGroups"),
        Api.get("/employees"),
        Api.get("/workGroups"),
      ]);

      this.postDetails = employeeWorkGroupsResponse.data;
      console.log("First element of postDetails:", this.postDetails[0]);

      this.employees = employeesResponse.data;
      this.workGroups = workGroupsResponse.data;
    },

    clearFilter1() {
      this.initFilters1();
    },

    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
      this.productDialogEdit = false; // Ensure productDialogEdit is false when opening a new product dialog
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

      if (this.product.workGroup.trim()) {
        const data = {
          name: this.product.workGroup,
        };

        Api.post("/workGroups", data)
          .then((response) => {
            const newWorkGroup = response.data;

            this.workGroups.push(newWorkGroup);

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

    handleEdit() {
      this.submitted = true;
      const updatedEquipment = {
        ...this.product,
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
    removeWhitespace(field) {
      this.product[field] = this.product[field].replace(/\s/g, "");
    },
  },
  computed: {
    mappedPostDetails() {
      if (this.postDetails) {
        return this.postDetails.map((postDetail) => ({
          workGroup: `${postDetail.workGroup.id} - ${postDetail.workGroup.name}`,
          employeeFullName: `${postDetail.employee.name} ${postDetail.employee.surname}`,
          employeePosition: postDetail.employee.position,
          employeePhoneNumber: postDetail.employee.phoneNumber,
          employeeId: postDetail.employee.id,
          employeeHealthExam: postDetail.employee.healthExam,
        }));
      } else {
        return [];
      }
    },
    groupedEmployees() {
      // First, group the employees by position
      const groups = this.employees.reduce((groups, employee) => {
        const key = employee.position;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push({
          label: `${employee.name} ${employee.surname}`,
          id: employee.id,
        });
        return groups;
      }, {});

      // Then, transform the groups into an array of objects
      return Object.entries(groups).map(([label, items]) => ({ label, items }));
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
