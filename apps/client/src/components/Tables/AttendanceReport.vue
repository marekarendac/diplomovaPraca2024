<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
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
          <Calendar
            v-model="dates"
            selectionMode="range"
            :manualInput="false"
            showButtonBar
            showIcon
            iconDisplay="input"
            placeholder="Zadaj rozsah"
          />
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
      <Column field="workedHours" header="Hodiny" ;></Column>
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
      dates: [],
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
