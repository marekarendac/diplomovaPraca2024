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
          label="Uprav skupinu"
          icon="pi pi-pencil"
          class="p-button-rounded p-button mr-1 p-button-raised"
          @click="editProduct"
        />

        <Button
          label="Vymaž skupinu"
          icon="pi pi-trash"
          class="p-button-rounded p-button-warning mr-1 p-button-raised"
          @click="confirmDeleteProduct"
        />
      </template>
    </Toolbar>
    <DataTable
      :value="mappedPostDetails"
      rowGroupMode="rowspan"
      groupRowsBy="workGroupFullName"
      sortMode="single"
      sortField="workGroupFullName"
      :sortOrder="1"
      style="min-height: 100vh"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column
        field="workGroupFullName"
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

    <div class="field col">
      <label for="employees">Členovia pracovnej skupiny</label>
      <div style="display: flex; align-items: center">
        <MultiSelect
          id="employees"
          v-model="selectedEmployees"
          :options="groupedEmployees"
          optionLabel="label"
          filter
          optionGroupLabel="label"
          optionGroupChildren="items"
          placeholder="Vyber jedného alebo viacerých členov"
          style="width: 100%"
          :class="{ 'p-invalid': submitted && selectedEmployees.length === 0 }"
        />
        <small
          class="p-error"
          v-if="submitted && selectedEmployees.length === 0"
          >Vyber aspoň jedného zamestnanca.</small
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
    :style="{ width: '550px' }"
    header="Edituj skupinu"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="name">Pracovná skupina</label>
      <div style="display: flex; align-items: center">
        <Dropdown
          id="workGroup"
          v-model="product"
          :options="workGroups"
          optionLabel="name"
          optionValue="id"
          placeholder="Vyber pracovnú skupinu na editovanie"
          style="width: 100%"
          autofocus
          @change="handleWorkGroupChange"
        />
      </div>
    </div>

    <div class="field col" v-if="selectedWorkGroup">
      <label for="name">Zmeň názov pracovnej skupiny</label>
      <div style="display: flex; align-items: center">
        <InputText
          id="name"
          required="true"
          v-model="selectedWorkGroup.name"
          autofocus
          :class="{ 'p-invalid': submitted && !selectedWorkGroup.name }"
          placeholder="Pracovná skupina"
        />
        <small class="p-error" v-if="submitted && !selectedWorkGroup.name"
          >Názov pracovnej skupiny je povinné pole.</small
        >
      </div>
    </div>

    <div class="field col" v-if="selectedWorkGroup">
      <label for="employees">Pridaj členov pracovnej skupiny</label>
      <div style="display: flex; align-items: center">
        <MultiSelect
          id="employees"
          v-model="selectedEmployees"
          :options="groupedEmployees"
          optionLabel="label"
          filter
          optionGroupLabel="label"
          optionGroupChildren="items"
          placeholder="Pridaj jedného alebo viacerých členov do skupiny"
          style="flex-grow: 1; width: auto; max-width: calc(550px - 140px)"
        />
        <Button
          icon="pi pi-check"
          class="p-button-success"
          style="margin-left: 20px; flex-shrink: 0"
          disabled
        />
      </div>
    </div>

    <div
      class="field col"
      v-for="(employee, index) in selectedWorkGroupEmployees"
      :key="index"
    >
      <label for="employee">Člen pracovnej skupiny {{ index + 1 }}</label>
      <div style="display: flex; align-items: center">
        <InputText id="employee" v-model="employee.fullName" disabled />
        <Button
          icon="pi pi-times"
          class="p-button-warning"
          style="margin-left: 10px"
          @click="editEmployeeWorkGroup(index)"
        />
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
    header="Vymaž vybranú pracovnú skupinu"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <b>Chceš vymazať túto skupinu ?</b>
      <div class="text-align-center">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-trash"></i>
          </span>

          <Dropdown
            id="workGroup"
            v-model="product"
            :options="workGroups"
            optionLabel="name"
            optionValue="id"
            placeholder="Názov novej pracovnej skupiny"
            :class="{ 'p-invalid': submitted && !product.workGroup }"
            @change="product = $event.value"
          /><br />
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
      selectedEmployees: [],
      selectedWorkGroupEmployees: [],
      employeesToRemove: [],
      selectedWorkGroup: null,
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

      this.employees = employeesResponse.data.map((employee) => ({
        ...employee,
        fullName: `${employee.name} ${employee.surname}`,
      }));

      this.workGroups = workGroupsResponse.data;

      console.log("First element of postDetails:", this.postDetails[0]);
      console.log("First element of employees:", this.employees[0]);
      console.log("First element of worgroups:", this.workGroups[0]);
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

    async handleSubmit() {
      this.submitted = true;

      if (this.product.workGroup.trim() && this.selectedEmployees.length > 0) {
        const workGroupData = {
          name: this.product.workGroup,
        };

        try {
          const response = await Api.post("/workGroups", workGroupData);
          const newWorkGroup = response.data;

          const employeeWorkGroupData = {
            workGroupId: newWorkGroup.id,
            employees: this.selectedEmployees.map((employee) => employee.id),
          };

          await Api.post("/employeeWorkGroups", employeeWorkGroupData);
          this.getPostDetails();

          this.$toast.add({
            severity: "success",
            summary: "Úspech",
            detail: "Záznam bol vytvorený!",
            life: 800,
          });
        } catch (error) {
          console.log(error);
        }

        setTimeout(() => {
          this.productDialog = false;
        }, 800);
      }
    },

    confirmDeleteProduct() {
      this.deleteProductDialog = true;
    },

    async deleteProduct() {
      if (this.product) {
        this.workGroups = this.workGroups.filter(
          (val) => val.id !== this.product.id
        );

        try {
          await Api.delete("workGroups/" + this.product);

          this.$toast.add({
            severity: "warn",
            summary: "Vymazané",
            detail: "Záznam bol vymazaný.",
            life: 800,
          });

          setTimeout(() => {
            this.deleteProductDialog = false;
          }, 800);
        } catch (error) {
          if (error.response && error.response.status === 409) {
            this.$toast.add({
              severity: "info",
              summary: "Chyba",
              detail:
                "Záznam nemôže byť vymazaný, pretože je referencovaný inými entitami.",
              life: 2000,
            });

            setTimeout(() => {
              this.deleteProductDialog = false;
            }, 2000);
          } else {
            // handle other types of errors or rethrow if you don't want to handle them here
            throw error;
          }
        }
      } else {
        console.error("No product selected for deletion");
      }
    },

    editProduct(product) {
      this.product = { ...product };
      this.productDialogEdit = true;
    },

    async handleEdit() {
      this.submitted = true;

      // Find the selected work group in the workGroups array
      const selectedWorkGroup = this.workGroups.find(
        (workGroup) => workGroup.id === this.product
      );

      // Update the selected work group's name
      selectedWorkGroup.name = this.selectedWorkGroup.name;

      console.log("updatedWorkGroup:", selectedWorkGroup);

      try {
        await Api.put("workGroups/" + this.product, selectedWorkGroup);

        if (this.product) {
          this.workGroups[this.findIndexById(this.product)] = selectedWorkGroup;
        }

        console.log("workGroups after update:", this.workGroups);

        // Remove the employees that were removed from the group
        for (const employeeId of this.employeesToRemove) {
          const deleteParams = {
            workGroupId: this.product,
            employeeId: employeeId,
          };

          console.log("deleteParams:", deleteParams);

          await Api.delete(`employeeWorkGroups/removeEmployee`, {
            data: deleteParams,
          });
        }

        // Add the new employees to the group
        const addParams = {
          workGroupId: this.product,
          employees: this.selectedEmployees.map((employee) => employee.id),
        };

        console.log("addParams:", addParams);

        await Api.post(`/employeeWorkGroups`, addParams);

        // Clear the list of employees to remove and to add
        this.employeesToRemove = [];
        this.selectedEmployees = [];

        console.log("employeesToRemove after clear:", this.employeesToRemove);
        console.log("selectedEmployees after clear:", this.selectedEmployees);

        this.$toast.add({
          severity: "success",
          summary: "Úspech",
          detail: "Záznam bol editovaný!",
          life: 800,
        });
      } catch (error) {
        console.log("Error in handleEdit:", error);
      }

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

    handleWorkGroupChange(selectedWorkGroup) {
      if (selectedWorkGroup) {
        this.selectedWorkGroup = selectedWorkGroup;
        const selectedWorkGroupRelations = this.postDetails.filter(
          (relation) => relation.WorkGroupId === this.product
        );
        this.selectedWorkGroupEmployees = selectedWorkGroupRelations.map(
          (relation) => {
            return this.employees.find(
              (employee) => employee.id === relation.EmployeeId
            );
          }
        );

        // Get the IDs of the selected employees
        const selectedEmployeeIds = this.selectedWorkGroupEmployees.map(
          (employee) => employee.id
        );

        // Filter the groupedEmployees array to remove the selected employees
        this.groupedEmployees = this.groupedEmployees.map((group) => {
          group.items = group.items.filter(
            (employee) => !selectedEmployeeIds.includes(employee.id)
          );
          return group;
        });
      } else {
        this.selectedWorkGroup = null;
      }
    },

    editEmployeeWorkGroup(index) {
      const employee = this.selectedWorkGroupEmployees[index];
      this.employeesToRemove.push(employee.id);
      this.selectedWorkGroupEmployees.splice(index, 1);
    },
  },

  computed: {
    mappedPostDetails() {
      if (this.postDetails) {
        return this.postDetails.map((postDetail) => ({
          workGroupFullName: `${postDetail.workGroup.id} - ${postDetail.workGroup.name}`,
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
