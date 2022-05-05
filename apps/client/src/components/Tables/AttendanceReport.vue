<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <div class="text-left">
          <div class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText
              v-model="filters1['global'].value"
              placeholder="Global Search"
              size="25"
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
      scrollHeight="70vh"
    >
      <Column
        field="id"
        header="ID"
        style="min-width: 5%"
        :sortable="true"
      ></Column
      ><Column
        field="employeeName"
        header="Meno"
        style="min-width: 20%"
        :sortable="true"
        ;
      ></Column>
      <Column
        field="date"
        header="Dátum"
        style="min-width: 15%"
        :sortable="true"
        ;
      ></Column>
      <Column
        field="description"
        header="Popis práce"
        style="min-width: 35%"
        :sortable="true"
      ></Column>
      <Column
        field="employeeHours"
        header="Hodiny"
        style="min-width: 5%"
        :sortable="true"
        ;
      ></Column>
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
      Api.get("/attendances").then((response) => {
        this.postDetails = response.data;

        console.log(response.data);
      });
    },

    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
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
