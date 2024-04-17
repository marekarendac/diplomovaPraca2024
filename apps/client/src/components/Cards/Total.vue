<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <!--  <div class="text-left">
          <div class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText
              v-model="filters1['global'].value"
              placeholder="2022-mesiac"
              size="25"
            /> -->
        <Calendar
          v-model="filters1.value"
          view="month"
          dateFormat="mm/yy"
          :manualInput="false"
          showButtonBar
          showIcon
          iconDisplay="input"
          placeholder="Zadaj rozsah"
          class="mr-3"
          style="width: 50%"
        />

        <Button
          label="Export tabuľky"
          icon="pi pi-external-link"
          @click="exportEmployees"
          class="p-button-rounded p-button-secondary p-button-raised p-button-outlined mr-2"
        />
        <!-- </div> -->
        <!--  </div> -->
      </template>
    </Toolbar>

    <DataTable
      :value="filteredPostDetails"
      :sortOrder="1"
      removableSort
      filterMode="lenient"
      :scrollable="true"
      style="min-height: 100vh"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column field="employee" header="Meno" :sortable="true"></Column
      ><Column field="month" header="Mesiac" :sortable="true"></Column>
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
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      postDetails: null,
      filters1: { value: null },
      filteredPostDetails: null,
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
  },

  mounted() {
    this.getPostDetails();
  },
  methods: {
    getPostDetails() {
      Api.get("/attendances/months/employees").then((response) => {
        this.postDetails = response.data;
        this.filteredPostDetails = response.data;
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
