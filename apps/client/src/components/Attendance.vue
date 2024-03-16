<template>
  <Splitter class="full-height">
    <SplitterPanel
      class="flex align-items-center justify-content-center"
      :size="25"
    >
      <div>
        <div class="field col flex flex-column gap-2">
          <label for="project">Zvoľ projekt</label>
          <Dropdown
            id="project"
            required="true"
            v-model="selectedProjectId"
            :options="projects"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a project"
          />
        </div>
        <div class="field col flex flex-column gap-2">
          <label for="project">Vyber dátum záznamu práce</label>
          <Calendar
            showIcon
            v-model="date"
            placeholder="Zadaj dátum"
            style="width: 100%"
            dateFormat="yy-mm-dd"
          />
        </div>

        <div>
          <div class="field col flex flex-column gap-2">
            <label for="project">Zadaj popis odvedenej práce</label>
            <Textarea v-model="workDescription" />
          </div>
        </div>
      </div>
    </SplitterPanel>

    <SplitterPanel class="flex" :size="75"
      ><Splitter style="height: 470px" layout="vertical">
        <SplitterPanel class="flex">
          <div class="field col flex flex-column gap-2">
            <label for="name">Názov zvoleného projektu</label>
            <InputText
              id="name"
              placeholder="Nebol zvolený projekt"
              v-model.trim="selectedProject.name"
              readonly
            />

            <label for="workPlace">Miesto práce</label>
            <InputText
              id="workPlace"
              placeholder="Nebol zvolený projekt"
              v-model.trim="selectedProject.workPlace"
              readonly
            />
          </div>

          <div class="field col flex flex-column gap-2">
            <label for="customerName">Názov objednávateľa</label>
            <InputText
              id="customerName"
              placeholder="Nebol zvolený projekt"
              :value="
                selectedProject && selectedProject.projectCustomer
                  ? selectedProject.projectCustomer.name
                  : ''
              "
              readonly
            />

            <label for="workedHours">Odpracované hodiny na projekte</label>
            <InputText
              id="workedHours"
              placeholder="Nebol zvolený projekt"
              v-model.trim="selectedProject.workedHours"
              readonly
            />
          </div>

          <div class="field col flex flex-column gap-2">
            <label for="customerName">Pridelená pracovná skupina</label>
            <InputText
              id="customerName"
              :placeholder="
                selectedProject && selectedProject.defaultWorkGroup !== null
                  ? 'Nebol zvolený projekt'
                  : 'Nebola pridelená pracovná skupina'
              "
              :value="
                selectedProject && selectedProject.defaultWorkGroup
                  ? selectedProject.defaultWorkGroup.name
                  : ''
              "
              readonly
            />

            <div class="field col flex flex-column gap-2">
              <label for="status">Status projektu</label>
              <Dropdown
                id="status"
                v-model="selectedProject.status"
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
          </div>
        </SplitterPanel>
        <SplitterPanel class="flex align-items-center justify-content-center">
          <div
            class="field col"
            v-for="(employeeWorkGroup, index) in selectedProject &&
            selectedProject.defaultWorkGroup
              ? selectedProject.defaultWorkGroup.employeeWorkGroups
              : []"
            :key="index"
          >
            <label for="employee">Člen pracovnej skupiny {{ index + 1 }}</label>
            <div style="display: flex; align-items: center">
              <InputText
                id="employee"
                v-model="employeeWorkGroup.employee.name"
                disabled
              />
              <Button
                icon="pi pi-times"
                class="p-button-warning"
                style="margin-left: 10px"
                @click="editEmployeeWorkGroup(index)"
              />
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
    </SplitterPanel>
  </Splitter>
</template>
<script>
import Api from "@/services/Api.js";
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10), // Set the default date to today
      submitted: false,
      workDescription: null,
      customers: null,
      selectedProjectId: null,
      selectedProject: {},
      employees: null,
      projectId: null,
      projects: [],
      product: {},
      status: null,
      statuses: [
        { status: "Otvorený" },
        { status: "Aktívny" },
        { status: "Uzavretý" },
      ],
    };
  },
  mounted() {
    this.getProjectDetails();
    this.getEmployeesDetails();
    this.getAttendancesDetails();
    this.employeeWorkGroupsDetails();
  },
  methods: {
    async getEmployeesDetails() {
      await Api.get("/employees").then((response) => {
        this.employees = response.data.map((employee) => ({
          ...employee,
          fullName: `${employee.name} ${employee.surname}`,
        }));
      });
    },

    async getProjectDetails() {
      await Api.get("/projects").then((response) => {
        this.projects = response.data;
      });
    },

    async getAttendancesDetails() {
      const response = await Api.get("/attendances");
      this.attendances = response.data;
    },

    async employeeWorkGroupsDetails() {
      const response = await Api.get("/employeeWorkGroups");
      this.employeeWorkGroups = response.data;
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
  watch: {
    selectedProjectId(newVal) {
      this.selectedProject =
        this.projects.find((project) => project.id === newVal) || {};
    },
  },
};
</script>
<style scoped>
.full-height {
  min-height: 89vh;
  overflow: auto;
}
</style>
