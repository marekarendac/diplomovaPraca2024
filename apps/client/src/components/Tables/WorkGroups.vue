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
          @click="exportEquipment"
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
    getPostDetails() {
      Api.get("/employeeWorkGroups").then((response) => {
        this.postDetails = response.data;
        console.log("employeeWorkGroups:", response.data);
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
          equipmentType: this.product.equipmentType.type,
          description: this.product.description,
          status: this.product.status.status,
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
