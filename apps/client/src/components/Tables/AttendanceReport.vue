<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <Calendar
          v-model="dates"
          selectionMode="range"
          :manualInput="false"
          showButtonBar
          showIcon
          iconDisplay="input"
          placeholder="Zadaj rozsah"
          class="mr-3"
        />
        <div class="text-left">
          <div class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText
              v-model="filters1['global'].value"
              placeholder="Zadaj kľúčové slovo"
              size="40"
              class="mr-3"
            />
          </div>
        </div> </template
      ><template #end>
        <Button
          label="Export tabuľky"
          icon="pi pi-external-link"
          @click="exportEmployees"
          class="p-button-rounded p-button-secondary p-button-raised p-button-outlined mr-2"
        />
      </template>
    </Toolbar>

    <DataTable
      :value="postDetails"
      :filters="filters1"
      filterMode="lenient"
      sortField="date"
      :sortOrder="1"
      removableSort
      :scrollable="true"
      style="min-height: 100vh"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      ><Column field="date" header="Dátum" :sortable="true" ;> </Column>
      <Column
        field="fullName"
        header="Meno"
        style="min-width: 20%"
        :sortable="true"
        ;
      ></Column>

      <Column
        field="attendanceProject.name"
        header="Projekt"
        :sortable="true"
      ></Column>

      <Column
        field="workDescription"
        header="Popis práce"
        style="min-width: 35%"
      ></Column>
      <Column field="workedHours" header="Hodiny" ;></Column
      ><Column header="Operácie" :exportable="false" style="max-width: 13%"
        ><template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-1"
            @click="editProduct(slotProps.data)"
          />

          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteProduct(slotProps.data)"
          /> </template
      ></Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="deleteProductDialog"
    :style="{ width: '35%' }"
    header="Vymaž vybraný záznam"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <b>Chceš vymazať tento záznam ?</b>
      <div class="text-align-center">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText id="name" v-model.trim="product.fullName" readonly /><br />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-calendar"></i>
          </span>
          <InputText id="date" v-model.trim="product.date" readonly /><br />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-box"></i>
          </span>
          <InputText
            id="attendanceProject.name"
            v-model.trim="product.attendanceProject.name"
            readonly
          /><br />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-comment"></i>
          </span>
          <InputText
            id="workDescription"
            v-model.trim="product.workDescription"
            readonly
          /><br />
        </div>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-chart-pie"></i>
          </span>
          <InputText
            id="workedHours"
            v-model.trim="product.workedHours"
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
    :style="{ width: '35%' }"
    header="Edituj vybraný záznam"
    :modal="true"
    class="p-fluid"
  >
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText id="name" v-model.trim="product.fullName" readonly /><br />
    </div>

    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-box"></i>
      </span>
      <InputText
        id="attendanceProject.name"
        v-model.trim="product.attendanceProject.name"
        readonly
      /><br />
    </div>

    <div class="field col">
      <label for="workDescription">Popis vykonanej práce</label>
      <Textarea
        id="workDescription"
        required="true"
        v-model.trim="product.workDescription"
        autofocus
        autoResize
        maxlength="245"
        placeholder="Popis vykonanej práce..."
        :class="{ 'p-invalid': submitted && !product.workDescription }"
      />
      <small class="p-error" v-if="submitted && !product.workDescription"
        >Popis je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="date">Zdravotná prehliadka</label>
      <Calendar
        showIcon
        id="date"
        required="true"
        v-model="product.date"
        autofocus
        :class="{ 'p-invalid': submitted && !product.date }"
      />
      <small class="p-error" v-if="submitted && !product.date"
        >Zdravotná prehliadka je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="workedHours">Odpracované hodiny</label>
      <div style="display: flex; align-items: center">
        <InputNumber
          id="workedHours"
          v-model.trim="product.workedHours"
          inputId="horizontal-buttons"
          required="true"
          autofocus
          autoResize
          showButtons
          buttonLayout="horizontal"
          :step="0.5"
          style="margin-left: 10px"
          :class="{ 'p-invalid': submitted && !product.workDescription }"
          ><small class="p-error" v-if="submitted && !product.workDescription"
            >Popis je povinné pole.</small
          >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
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
      filters1: {},
      dates: [],
      submitted: false,
      showProductDialog: false,
      productDialog: false,
      productDialogEdit: false,
      product: {},
      deleteProductDialog: false,
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
      Api.get("/attendances").then((response) => {
        this.postDetails = response.data.map((attendanceEmployee) => ({
          ...attendanceEmployee,
          fullName: `${attendanceEmployee.attendanceEmployee.name} ${attendanceEmployee.attendanceEmployee.surname}`,
        }));
      });
    },

    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // date: {
        //   operator: FilterOperator.AND,
        //   constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        // },
      };
    },
    // formatDate(value) {
    //   return value.toLocaleDateString("en-US", {
    //     day: "2-digit",
    //     month: "2-digit",
    //     year: "numeric",
    //   });
    // },
    clearFilter1() {
      this.initFilters1();
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },

    editProduct(product) {
      this.product = { ...product };
      this.product.position = product.position;
      this.product.contractType = product.contractType;
      this.productDialogEdit = true;
    },

    hideDialogEdit() {
      this.productDialogEdit = false;
      this.submitted = false;
    },

    handleEdit() {
      this.submitted = true;

      let attendanceDate = this.product.date;
      if (typeof this.product.date === "string") {
        attendanceDate = new Date(this.product.date);
      }

      const updatedAttendance = {
        ...this.product,
        date: attendanceDate
          ? attendanceDate.toISOString().split("T")[0]
          : null, // format the date
        ProjectId: this.product.ProjectId,
        EmployeeId: this.product.EmployeeId,
        workedHours: this.product.workedHours,
        workDescription: this.product.workDescription,
      };

      Api.put("attendances/" + this.product.id, updatedAttendance)
        .then(() => {
          if (this.product.id) {
            this.postDetails[this.findIndexById(this.product.id)] =
              updatedAttendance;
          }

          Api.get("/attendances").then((response) => {
            this.postDetails = response.data.map((attendanceEmployee) => ({
              ...attendanceEmployee,
              fullName: `${attendanceEmployee.attendanceEmployee.name} ${attendanceEmployee.attendanceEmployee.surname}`,
            }));
          });

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

    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },

    async deleteProduct() {
      try {
        await Api.delete("attendances/" + this.product.id);

        this.postDetails = this.postDetails.filter(
          (val) => val.id !== this.product.id
        );

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
</style>
