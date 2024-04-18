<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <div class="text-left">
          <div class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText
              v-model="filters2['global'].value"
              placeholder="Zadaj kľúčové slovo"
              size="30"
              class="mr-3"
            />
          </div>
        </div>
        <Calendar
          v-model="filters1.value"
          view="month"
          dateFormat="mm/yy"
          :manualInput="false"
          showButtonBar
          showIcon
          iconDisplay="input"
          placeholder="Zadaj mesiac"
          class="mr-3"
        />
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template
      ><template #end>
        <Button
          label="Export tabuľky"
          icon="pi pi-external-link"
          @click="exportFilterredProjects"
          class="p-button-rounded p-button-secondary p-button-raised p-button-outlined mr-2"
        />
      </template>
    </Toolbar>

    <DataTable
      :value="filteredPostDetails"
      :filters="filters2"
      :sortOrder="1"
      removableSort
      filterMode="lenient"
      :scrollable="true"
      style="min-height: 100vh"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column field="project" header="Projekt" :sortable="true"> </Column>

      <Column
        field="status"
        header="Status projektu"
        :sortable="true"
        filterField="date"
        ;
      >
      </Column>

      <Column
        field="month"
        header="Mesiac"
        :sortable="true"
        filterField="date"
        ;
      >
      </Column>
      <Column
        field="hours"
        header="Odpracované hodiny celkom"
        :sortable="true"
        filterField="date"
        ;
      >
      </Column>
    </DataTable>
  </div>
</template>

<script>
import Api from "@/services/Api.js";
import { FilterMatchMode, FilterOperator } from "primevue/api";
export default {
  data() {
    return {
      postDetails: null,
      date: null,
      projects: null,
      filteredPostDetails: null,
      filters1: { value: null },
      filters2: { value: null },
    };
  },
  watch: {
    "filters1.value": function (newVal) {
      if (newVal) {
        const selectedMonth = `${newVal.getFullYear()}-${
          newVal.getMonth() + 1
        }`;
        this.filteredPostDetails = this.postDetails.filter(
          (post) => post.month === selectedMonth
        );
      } else {
        this.filteredPostDetails = this.postDetails;
      }
    },
  },
  created() {
    this.initFilters1();
    this.initFilters2();
  },

  mounted() {
    this.getPostDetails();
  },
  methods: {
    getPostDetails() {
      Api.get("/attendances/months/projects").then((response) => {
        console.log("Monthly project hours:", response.data);
        this.postDetails = response.data;
        this.filteredPostDetails = response.data;
      });
    },

    initFilters2() {
      this.filters2 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
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
