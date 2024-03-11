<template>
  <Splitter>
    <SplitterPanel
      class="flex align-items-center justify-content-center"
      :size="25"
      :minSize="10"
    >
      <div class="flex-1 bg-white font-bold text-left p-2 border-round">
        <div>
          <Dropdown
            id="project"
            required="true"
            v-model="projectId"
            :options="projects"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a project"
          />
        </div>
        <div>
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
      customers: null,
      selectedCustomer: null,
      employees: null,
      projectId: null,
      projects: [],
    };
  },
  mounted() {
    this.getCustomerDetails();
    this.getAllEmployees();
    this.getAttendances();
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

    async getCustomerDetails() {
      await Api.get("/customers").then((response) => {
        this.customers = response.data;
      });
    },

    async getAttendances() {
      try {
        const response = await Api.get("/attendances");
        this.attendances = response.data;

        // Log the first row of the attendances table
        if (this.attendances.length > 0) {
          console.log(this.attendances[44]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async handleSubmit() {
      const payload = {
        date: this.date,
        projectId: this.projectId,
        workedHours: this.workedHours,
        employeeId: this.employeeId,
        workDescription: this.workDescription,
      };

      try {
        const response = await Api.post("/attendances", payload);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style></style>
