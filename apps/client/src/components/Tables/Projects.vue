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
          @click="exportProjects"
          class="p-button-rounded p-button-secondary p-button-raised p-button-outlined mr-2"
        />
      </template>
    </Toolbar>

    <DataTable
      :value="postDetails"
      :filters="filters1"
      sortField="healthExam"
      :sortOrder="1"
      removableSort
      filterMode="lenient"
      :scrollable="true"
      style="min-height: 100vh"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column
        field="id"
        header="#"
        :sortable="true"
        style="max-width: 70px"
      ></Column>

      <Column
        field="name"
        header="Názov projektu"
        :sortable="true"
        style="min-width: 270px"
      ></Column
      ><Column
        field="workPlace"
        header="Miesto práce"
        :sortable="true"
        style="min-width: 270px"
      ></Column>

      <Column
        field="projectCustomer.name"
        header="Zákazník"
        :sortable="true"
        style="max-width: 150px"
      ></Column>

      <Column
        field="status"
        header="Status projektu"
        :sortable="true"
        style="min-width: 150px"
      >
      </Column>

      <Column field="workedHours" header="TOTAL [h]" :sortable="true">
        <template #body="slotProps">
          {{
            slotProps.data.workedHours !== null &&
            slotProps.data.workedHours !== undefined
              ? slotProps.data.workedHours
              : "0.0"
          }}
        </template>
      </Column>

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
      <label for="id"># Interné číslo</label
      ><AutoComplete id="name" v-model.trim="product.id" disabled />
    </div>

    <div class="field col">
      <label for="name">Názov projektu</label
      ><AutoComplete id="name" v-model.trim="product.name" disabled />
    </div>

    <div class="field col">
      <label for="status">Status projektu</label
      ><AutoComplete id="status" v-model.trim="product.status" disabled />
    </div>

    <div class="field col">
      <label for="description">Popis projektu</label
      ><AutoComplete
        id="description"
        v-model.trim="product.description"
        disabled
      />
    </div>

    <div class="field col">
      <label for="workPlace">Miesto práce</label
      ><AutoComplete id="workPlace" v-model.trim="product.workPlace" disabled />
    </div>

    <div class="field col">
      <label for="projectCustomer.name">Zákazník</label
      ><AutoComplete
        id="projectCustomer.name"
        v-model.trim="product.projectCustomer.name"
        disabled
      />
    </div>

    <div class="field col">
      <label for="workedHours">Odpracované hodiny</label
      ><AutoComplete
        id="workedHours"
        v-model.trim="product.workedHours"
        disabled
      />
    </div>

    <div class="field col">
      <label for="workGroup">Pridelená pracovná skupina</label>
      <AutoComplete id="workGroup" v-model.trim="workGroupName" disabled />
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
    header="Pridaj nový projekt"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="name">Názov projektu</label>
      <InputText
        id="name"
        required="true"
        v-model.trim="product.name"
        autofocus
        :class="{ 'p-invalid': submitted && !product.name }"
        maxlength="244"
        placeholder="Zadaj názov projektu"
      />
      <small class="p-error" v-if="submitted && !product.name"
        >Značka je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="status">Status projektu</label>
      <Dropdown
        id="status"
        :options="statuses"
        optionLabel="status"
        required="true"
        v-model="product.status"
        autofocus
        :class="{ 'p-invalid': submitted && !product.status }"
        placeholder="Vyber status projektu"
      />
      <small class="p-error" v-if="submitted && !product.status"
        >Stav je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="description">Popis projektu</label>
      <Textarea
        id="description"
        required="true"
        v-model.trim="product.description"
        autofocus
        autoResize
        maxlength="245"
        placeholder="Popis projektu..."
        :class="{ 'p-invalid': submitted && !product.description }"
      />
      <small class="p-error" v-if="submitted && !product.description"
        >Popis je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="workPlace">Miesto práce</label>
      <InputText
        id="workPlace"
        required="true"
        v-model.trim="product.workPlace"
        autofocus
        :class="{ 'p-invalid': submitted && !product.workPlace }"
        maxlength="50"
        placeholder="Zadaj miesto práce"
      />
      <small class="p-error" v-if="submitted && !product.workPlace"
        >Miesto práce je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="projectCustomer.name">Zákazník</label>
      <Dropdown
        id="projectCustomer.id"
        required="true"
        v-model="product.customerId"
        autofocus
        :class="{ 'p-invalid': submitted && !product.customerId }"
        :options="customers"
        optionLabel="name"
        optionValue="id"
        placeholder="Prideľ zákazníka"
      />
      <small class="p-error" v-if="submitted && !product.customerId"
        >Zákazník je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="defaultWorkGroup.name">Pridelená pracovná skupina</label>
      <Dropdown
        id="defaultWorkGroup.id"
        required="true"
        v-model="product.defaultWorkGroupId"
        autofocus
        :options="workGroups"
        optionLabel="name"
        optionValue="id"
        placeholder="Prideľ pracovnú skupinu"
      />
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
      <div class="text-align-center">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-box"></i>
          </span>
          <InputText id="name" v-model.trim="product.name" readonly /><br />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-building"></i>
          </span>
          <InputText
            id="workPlace"
            v-model.trim="product.workPlace"
            readonly
          /><br />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText id="customerName" :value="customerName" readonly /><br />
        </div>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-chart-bar"></i>
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
    :style="{ width: '450px' }"
    header="Edituj vybraný záznam"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="name">Názov projektu</label>
      <InputText
        id="name"
        required="true"
        v-model.trim="product.name"
        autofocus
        :class="{ 'p-invalid': submitted && !product.name }"
        maxlength="244"
        placeholder="Zadaj názov projektu"
      />
      <small class="p-error" v-if="submitted && !product.name"
        >Značka je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="status">Status projektu</label>
      <Dropdown
        id="status"
        v-model="product.status"
        :options="statuses"
        optionLabel="status"
        optionValue="status"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !product.status }"
        placeholder="Vyber status projektu"
      />
      <small class="p-error" v-if="submitted && !product.status"
        >Stav je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="description">Popis projektu</label>
      <Textarea
        id="description"
        required="true"
        v-model.trim="product.description"
        autofocus
        autoResize
        maxlength="245"
        placeholder="Popis projektu..."
        :class="{ 'p-invalid': submitted && !product.description }"
      />
      <small class="p-error" v-if="submitted && !product.description"
        >Popis je povinné pole.</small
      >
    </div>

    <div class="field col">
      <label for="workPlace">Miesto práce</label>
      <InputText
        id="workPlace"
        required="true"
        v-model.trim="product.workPlace"
        autofocus
        :class="{ 'p-invalid': submitted && !product.workPlace }"
        maxlength="50"
        placeholder="Miesto práce"
      />
      <small class="p-error" v-if="submitted && !product.workPlace"
        >Miesto práce je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="projectCustomer.name">Zákazník</label>
      <Dropdown
        id="projectCustomerid"
        required="true"
        v-model="product.customerId"
        autofocus
        :class="{ 'p-invalid': submitted && !product.customerId }"
        :options="customers"
        optionLabel="name"
        optionValue="id"
        placeholder="Zákazník"
      />
      <small class="p-error" v-if="submitted && !product.customerId"
        >Zákazník je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="defaultWorkGroup.name">Pridelená pracovná skupina</label>
      <Dropdown
        id="defaultWorkGroup.id"
        required="true"
        v-model="product.defaultWorkGroupId"
        autofocus
        :options="workGroups"
        optionLabel="name"
        optionValue="id"
        placeholder="Prideľ pracovnú skupinu"
      />
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
      status: null,
      statuses: [
        { status: "Otvorený" },
        { status: "Aktívny" },
        { status: "Uzavretý" },
      ],
      customers: [],
      workGroups: [],
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
      Promise.all([
        Api.get("/projects"),
        Api.get("/customers"),
        Api.get("/workGroups"),
      ])
        .then(([projectsResponse, customersResponse, workGroupsResponse]) => {
          this.postDetails = projectsResponse.data;
          this.customers = customersResponse.data;
          this.workGroups = workGroupsResponse.data;

          console.log("First element of postDetails:", this.postDetails[0]);
          console.log("First element of customers:", this.customers[0]);
          console.log("First element of workGroups:", this.workGroups[0]);
          console.log("workgroup:", this.postDetails[0].defaultWorkGroup.name);
        })
        .catch((error) => {
          console.log("Error while getting post details:", error);
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

      if (
        this.product.name.trim() &&
        this.product.status &&
        this.product.description.trim() &&
        this.product.workPlace.trim() &&
        this.product.customerId
      ) {
        const projectData = {
          name: this.product.name,
          status: this.product.status.status,
          description: this.product.description,
          workPlace: this.product.workPlace,
          customerId: this.product.customerId,
          defaultWorkGroupId: this.product.defaultWorkGroupId,
        };

        Api.post("/projects", projectData)
          .then((response) => {
            const newProject = response.data;

            // Find the customer object from the customers array
            const customer = this.customers.find(
              (customer) => customer.id === this.product.customerId
            );
            const workGroup = this.workGroups.find(
              (workGroup) => workGroup.id === this.product.defaultWorkGroupId
            );

            // Add the customer object to the newProject object
            newProject.projectCustomer = customer;

            this.postDetails.push(newProject);

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
          .catch((error) => {
            console.log("Error while creating project:", error);
          });
      } else {
        console.log("Form validation failed"); // Log a message if form validation fails
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

      Api.delete("projects/" + this.product.id);

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
      this.productDialogEdit = true;
    },

    handleEdit() {
      this.submitted = true;

      if (
        this.product.name.trim() &&
        this.product.status &&
        this.product.description.trim() &&
        this.product.workPlace.trim() &&
        this.product.customerId
      ) {
        if (this.product.id) {
          this.postDetails[this.findIndexById(this.product.id)] = this.product;
        }

        Api.put("projects/" + this.product.id, {
          id: this.product.id,
          name: this.product.name,
          status: this.product.status,
          description: this.product.description,
          workPlace: this.product.workPlace,
          customerId: this.product.customerId,
          defaultWorkGroupId: this.product.defaultWorkGroupId,
        }).catch((error) => console.log(error));

        this.$toast.add({
          severity: "success",
          summary: "Úspech",
          detail: "Záznam bol editovaný!",
          life: 800,
        });

        setTimeout(() => {
          this.productDialogEdit = false;
        }, 800);
      }
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
    exportProjects() {
      if (window.confirm("Do you really want to download the file?")) {
        console.log("exportProjects called");
        Api.get("/exportProjects", {
          responseType: "blob", // Important for handling the binary data
        })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            const contentDisposition = response.headers["content-disposition"];
            let fileName = "projects.xlsx"; // default filename
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
    customerName() {
      // Assuming `customers` is an array of customer objects
      const customer = this.customers.find(
        (c) => c.id === this.product.customerId
      );
      return customer ? customer.name : "";
    },
    workGroupName() {
      return this.product.defaultWorkGroup
        ? this.product.defaultWorkGroup.name
        : "Zatiaľ nebola pridelená skupina";
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
