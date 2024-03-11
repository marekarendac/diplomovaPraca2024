<template>
  <Splitter>
    <SplitterPanel
      class="flex align-items-center justify-content-center"
      :size="25"
      :minSize="10"
    >
      <div class="flex-1 bg-white font-bold text-left p-2 border-round">
        <div>
          Dátum:
          <Calendar
            showIcon
            v-model="date"
            placeholder="Zadaj dátum"
            style="width: 100%"
          />
        </div>

        <div>
          <div>Popis práce:</div>
          <Textarea v-model="workDescription" />
        </div>
      </div>
    </SplitterPanel>
    <SplitterPanel
      class="flex align-items-center justify-content-center"
      :size="75"
    >
      Panel 2
    </SplitterPanel>
  </Splitter>
</template>
<script>
import Api from "@/services/Api.js";
export default {
  data() {
    return {
      date: null,
      workDescription: null,
      workHours1: 8,
      workHours2: 8,
      workHours3: 8,
      workHours4: 8,
      workHours5: 8,
      responsibleEmployees: {},
      places: {},
      selectedResEmployee: null,
      selectedPlace: null,
      customers: null,
      selectedCustomer: null,
      employees: null,
      selectedEmployee1: null,
      selectedEmployee2: null,
      selectedEmployee3: null,
      selectedEmployee4: null,
      selectedEmployee5: null,
    };
  },
  mounted() {
    this.getPlacesDetails();
    this.getResponsiblesDetails();
    this.getCustomerDetails();
    this.getAllEmployees();
  },
  methods: {
    async getAllEmployees() {
      await Api.get("/employees").then((response) => {
        this.employees = response.data.map((employee) => ({
          ...employee,
          fullName: `${employee.name} ${employee.surname}`,
        }));
      });
    },

    async getPlacesDetails() {
      await Api.get("/workPlaces").then((response) => {
        this.places = response.data;
      });
    },

    async getResponsiblesDetails() {
      await Api.get("/employees", { params: { position: "Majster" } }).then(
        (response) => {
          this.responsibleEmployees = response.data.map((employee) => ({
            ...employee,
            fullNameMajster: `${employee.name} ${employee.surname}`,
          }));
        }
      );
    },

    async getCustomerDetails() {
      await Api.get("/customers").then((response) => {
        this.customers = response.data;
      });
    },

    formatSingleEmployee(employee, hours) {
      if (employee && hours) {
        return {
          id: employee.id,
          hours,
        };
      }

      return null;
    },

    formatEmployeeData() {
      const formattedEmployee1 = this.formatSingleEmployee(
        this.selectedEmployee1,
        this.workHours1
      );
      const formattedEmployee2 = this.formatSingleEmployee(
        this.selectedEmployee2,
        this.workHours2
      );
      const formattedEmployee3 = this.formatSingleEmployee(
        this.selectedEmployee3,
        this.workHours3
      );
      const formattedEmployee4 = this.formatSingleEmployee(
        this.selectedEmployee4,
        this.workHours4
      );
      const formattedEmployee5 = this.formatSingleEmployee(
        this.selectedEmployee5,
        this.workHours5
      );

      return [
        formattedEmployee1,
        formattedEmployee2,
        formattedEmployee3,
        formattedEmployee4,
        formattedEmployee5,
      ].filter((employee) => employee);
    },

    async handleSubmit() {
      const payload = {
        date: this.date,
        workPlaceId: this.selectedPlace.id,
        responsibleId: this.selectedResEmployee.id,
        customerId: this.selectedCustomer.id,
        employees: this.formatEmployeeData(),
        description: this.workDescription,
      };
      await Api.post("/attendances", payload)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
      location.reload();
    },
  },
};
</script>
<style></style>
