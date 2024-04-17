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
              placeholder="Zadaj kľúčové slovo"
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
          @click="exportCustomers"
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
      <Column field="name" header="Zákazník" :sortable="true"></Column>
      <Column
        field="address"
        header="Adresa"
        :sortable="true"
        style="min-width: 260px"
      ></Column>
      <Column field="pointOfContact" header="Kontakt" :sortable="true"></Column>
      <Column field="phoneNumber" header="Telefón" :sortable="true"></Column>
      <Column
        field="email"
        header="Email"
        :sortable="true"
        style="min-width: 230px"
      ></Column>

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
    :style="{ width: '43%' }"
    header="Zobraziť záznam"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col">
      <label for="id"># Interné číslo zákazníka</label
      ><AutoComplete id="name" v-model.trim="product.id" disabled />
    </div>

    <div class="field col">
      <label for="name">Meno</label
      ><AutoComplete id="name" v-model.trim="product.name" disabled />
    </div>

    <div class="field col">
      <label for="pointOfContact">Kontaktná osoba</label
      ><AutoComplete
        id="pointOfContact"
        v-model.trim="product.pointOfContact"
        disabled
      />
    </div>

    <div class="field col">
      <label for="address">Adresa</label
      ><AutoComplete id="address" v-model.trim="product.address" disabled />
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
      <label for="email">Email</label
      ><AutoComplete id="email" v-model.trim="product.email" disabled />
    </div>

    <div class="field col">
      <label for="ICO">IČO</label
      ><AutoComplete id="ICO" v-model.trim="product.ICO" disabled />
    </div>

    <div class="field col">
      <label for="DIC">DIČ</label
      ><AutoComplete id="DIC" v-model.trim="product.DIC" disabled />
    </div>

    <div class="field col">
      <label for="ICDPH">IČDPH</label
      ><AutoComplete id="ICDPH" v-model.trim="product.ICDPH" disabled />
    </div>

    <div class="field col">
      <label for="IBAN">IBAN</label
      ><AutoComplete id="IBAN" v-model.trim="product.IBAN" disabled />
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
      <label for="name">Názov spoločnosti</label>
      <InputText
        id="name"
        required="true"
        v-model.trim="product.name"
        autofocus
        :class="{ 'p-invalid': submitted && !product.name }"
        maxlength="100"
        placeholder="Spoločnosť"
      />
      <small class="p-error" v-if="submitted && !product.name"
        >Meno je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="pointOfContact">Kontaktná osoba</label>
      <InputText
        id="pointOfContact"
        required="true"
        v-model.trim="product.pointOfContact"
        autofocus
        :class="{ 'p-invalid': submitted && !product.pointOfContact }"
        maxlength="25"
        placeholder="Kontaktná osoba"
      />
      <small class="p-error" v-if="submitted && !product.pointOfContact"
        >Kontaktná osoba je povinný údaj.</small
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
      <label for="city">Mesto</label>
      <InputText
        id="city"
        required="true"
        v-model.trim="product.city"
        autofocus
        :class="{ 'p-invalid': submitted && !product.city }"
        maxlength="20"
        placeholder="Mesto"
      />
      <small class="p-error" v-if="submitted && !product.city"
        >Mesto je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="street">Ulica</label>
      <InputText
        id="street"
        required="true"
        v-model.trim="product.street"
        autofocus
        :class="{ 'p-invalid': submitted && !product.street }"
        maxlength="20"
        placeholder="Ulica"
      />
      <small class="p-error" v-if="submitted && !product.street"
        >Ulica je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="PSC">PSČ</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="PSC"
          required="true"
          v-model="product.PSC"
          mask="99999"
          placeholder="00000"
          autofocus
          :class="{ 'p-invalid': submitted && !product.PSC }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.PSC"
        >PSČ je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="ICO">IČO</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="ICO"
          required="true"
          v-model="product.ICO"
          mask="99999999"
          placeholder="12345678"
          autofocus
          :class="{ 'p-invalid': submitted && !product.ICO }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.ICO"
        >IČO je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="DIC">DIČ</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="DIC"
          required="true"
          v-model="product.DIC"
          mask="9999999999"
          placeholder="1234567890"
          autofocus
          :class="{ 'p-invalid': submitted && !product.DIC }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.DIC"
        >DIČ je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="ICDPH">IČDPH</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="ICDPH"
          required="true"
          v-model="product.ICDPH"
          mask="SK9999999999"
          placeholder="SK1234567890"
          autofocus
          :class="{ 'p-invalid': submitted && !product.ICDPH }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.ICDPH"
        >IČDPH je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="IBAN">IBAN</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="IBAN"
          required="true"
          v-model="product.IBAN"
          mask="SK99999999999999999999"
          placeholder="SK00001111222233334444"
          autofocus
          :class="{ 'p-invalid': submitted && !product.IBAN }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.IBAN"
        >IBAN je povinný údaj.</small
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
            <i class="pi pi-briefcase"></i>
          </span>
          <InputText id="name" v-model.trim="product.name" readonly /><br />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-building"></i>
          </span>
          <InputText
            id="address"
            v-model.trim="product.address"
            readonly
          /><br />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-hashtag"></i>
          </span>
          <InputText id="ICO" v-model.trim="product.ICO" readonly /><br />
        </div>

        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-phone"></i>
          </span>
          <InputText
            id="name"
            v-model.trim="product.phoneNumber"
            readonly
          /><br />
        </div>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-at"></i>
          </span>
          <InputText id="email" v-model.trim="product.email" readonly />
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
      <label for="name">Názov spoločnosti</label>
      <InputText
        id="name"
        required="true"
        v-model.trim="product.name"
        autofocus
        :class="{ 'p-invalid': submitted && !product.name }"
        maxlength="20"
        placeholder="Spoločnosť"
      />
      <small class="p-error" v-if="submitted && !product.name"
        >Meno je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="pointOfContact">Kontaktná osoba</label>
      <InputText
        id="pointOfContact"
        required="true"
        v-model.trim="product.pointOfContact"
        autofocus
        :class="{ 'p-invalid': submitted && !product.pointOfContact }"
        maxlength="20"
        placeholder="Kontaktná osoba"
      />
      <small class="p-error" v-if="submitted && !product.pointOfContact"
        >Kontaktná osoba je povinný údaj.</small
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
      <label for="city">Mesto</label>
      <InputText
        id="city"
        required="true"
        v-model.trim="product.city"
        autofocus
        :class="{ 'p-invalid': submitted && !product.city }"
        maxlength="20"
        placeholder="Mesto"
      />
      <small class="p-error" v-if="submitted && !product.city"
        >Mesto je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="street">Ulica</label>
      <InputText
        id="street"
        required="true"
        v-model.trim="product.street"
        autofocus
        :class="{ 'p-invalid': submitted && !product.street }"
        maxlength="20"
        placeholder="Ulica"
      />
      <small class="p-error" v-if="submitted && !product.street"
        >Ulica je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="PSC">PSČ</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="PSC"
          required="true"
          v-model="product.PSC"
          mask="99999"
          placeholder="00000"
          autofocus
          :class="{ 'p-invalid': submitted && !product.PSC }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.PSC"
        >PSČ je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="ICO">IČO</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="ICO"
          required="true"
          v-model="product.ICO"
          mask="99999999"
          placeholder="12345678"
          autofocus
          :class="{ 'p-invalid': submitted && !product.ICO }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.ICO"
        >IČO je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="DIC">DIČ</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="DIC"
          required="true"
          v-model="product.DIC"
          mask="9999999999"
          placeholder="1234567890"
          autofocus
          :class="{ 'p-invalid': submitted && !product.DIC }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.DIC"
        >DIČ je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="ICDPH">IČDPH</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="ICDPH"
          required="true"
          v-model="product.ICDPH"
          mask="SK9999999999"
          placeholder="SK1234567890"
          autofocus
          :class="{ 'p-invalid': submitted && !product.ICDPH }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.ICDPH"
        >IČDPH je povinný údaj.</small
      >
    </div>

    <div class="field col">
      <label for="IBAN">IBAN</label>
      <div style="display: flex; align-items: center">
        <InputMask
          id="iban"
          required="true"
          v-model="product.IBAN"
          mask="SK99999999999999999999"
          placeholder="SK00001111222233334444"
          autofocus
          :class="{ 'p-invalid': submitted && !product.IBAN }"
        />
      </div>
      <small class="p-error" v-if="submitted && !product.IBAN"
        >IBAN je povinný údaj.</small
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
      filters1: {},
      deleteProductDialog: false,
      name: "",
      phoneNumber: "",
      city: "",
      street: "",
      ICO: "",
      DIC: "",
      ICDPH: "",
      IBAN: "",
      pointOfContact: "",
      email: "",
      PSC: "",
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
      Api.get("/customers").then((response) => {
        this.postDetails = response.data.map((customer) => ({
          ...customer,
          address: `${customer.city} ${customer.street} ${customer.PSC}`,
        }));
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

      Api.post("/customers", {
        name: this.product.name,
        phoneNumber: this.product.phoneNumber,
        city: this.product.city,
        street: this.product.street,
        ICO: this.product.ICO,
        DIC: this.product.DIC,
        ICDPH: this.product.ICDPH,
        IBAN: this.product.IBAN,
        pointOfContact: this.product.pointOfContact,
        email: this.product.email,
        PSC: this.product.PSC,
      })

        .then((response) => {
          const customer = response.data;
          this.postDetails.push({
            ...customer,
            address: `${customer.city} ${customer.street} ${customer.PSC}`,
          });

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
    },

    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },

    async deleteProduct() {
      try {
        await Api.delete("customers/" + this.product.id);

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
      const updatedCustomer = {
        ...this.product,
      };

      Api.put("customers/" + this.product.id, updatedCustomer)
        .then(() => {
          if (this.product.id) {
            const customerIndex = this.findIndexById(this.product.id);
            this.postDetails[customerIndex] = {
              ...updatedCustomer,
              address: `${updatedCustomer.city} ${updatedCustomer.street} ${updatedCustomer.PSC}`,
            };
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
    exportCustomers() {
      if (window.confirm("Do you really want to download the file?")) {
        console.log("exportCustomers called");
        Api.get("/exportCustomers", {
          responseType: "blob", // Important for handling the binary data
        })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            const contentDisposition = response.headers["content-disposition"];
            let fileName = "customers.xlsx"; // default filename
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
