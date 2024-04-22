<template>
  <Splitter class="full-height">
    <SplitterPanel
      class="flex align-items-start justify-content-center"
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
            showClear
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
            <div class="field col flex flex-column gap-2">
              <label for="project">Zadaj popis odvedenej práce</label>
              <Textarea v-model="workDescription" style="height: 300px" />
            </div>
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
              disabled
            />

            <label for="workPlace">Miesto práce</label>
            <InputText
              id="workPlace"
              placeholder="Nebol zvolený projekt"
              v-model.trim="selectedProject.workPlace"
              readonly
              disabled
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
              disabled
            />

            <label for="workedHours">Odpracované hodiny na projekte</label>
            <InputText
              id="workedHours"
              placeholder="Nebol zvolený projekt"
              v-model.trim="selectedProject.workedHours"
              readonly
              disabled
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
              disabled
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
          <div>
            <Button
              label="Pridaj ďalšieho člena"
              @click="addEmployee"
              v-if="selectedProjectId"
            />

            <div
              class="field col"
              v-for="(additionalEmployee, index) in additionalEmployees
                .slice()
                .reverse()"
              :key="'additional-' + index"
            >
              <label for="additional-employee"
                >Doplnený člen do pracovnej aktivity
                {{ additionalEmployees.length - index }}</label
              >
              <div style="display: flex; align-items: center">
                <Button
                  icon="pi pi-times"
                  class="p-button-warning"
                  style="margin-right: 10px"
                  @click="
                    deleteAdditionalEmployee(
                      additionalEmployees.length - 1 - index
                    )
                  "
                />
                <Dropdown
                  id="'additional-employee' + index"
                  v-model="additionalEmployee.selected"
                  :options="filteredEmployees()"
                  :optionDisabled="(option) => option.disabled"
                  optionLabel="fullName"
                  optionValue="id"
                  filter
                  placeholder="Zvoľ člena"
                  showClear
                  style="width: 203px"
                />
                <InputNumber
                  v-model="additionalEmployee.hours"
                  inputId="horizontal-buttons"
                  showButtons
                  buttonLayout="horizontal"
                  :step="0.5"
                  style="margin-left: 10px"
                  :min="0.5"
                  :max="24"
                >
                  <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                  </template>
                  <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                  </template>
                </InputNumber>
              </div>
            </div>
            <div v-if="selectedProjectId">
              <div v-if="selectedProject.defaultWorkGroupId">
                <div
                  class="field col"
                  v-for="(employeeWorkGroup, index) in employeeWorkGroups"
                  :key="index"
                >
                  <label for="employee"
                    >Člen pracovnej skupiny zvoleného projektu
                    {{ index + 1 }}</label
                  >
                  <div style="display: flex; align-items: center">
                    <Button
                      icon="pi pi-times"
                      class="p-button-warning"
                      style="margin-right: 10px"
                      @click="deleteEmployeeFromWorkGroup(index)"
                    />
                    <InputText
                      id="employee"
                      v-model="employeeWorkGroup.employee.fullName"
                      disabled
                    />

                    <InputNumber
                      v-model="inputNumberValues[index]"
                      inputId="horizontal-buttons"
                      showButtons
                      buttonLayout="horizontal"
                      :step="0.5"
                      style="margin-left: 10px"
                      :min="0.5"
                      :max="24"
                    >
                      <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                      </template>
                      <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                      </template>
                    </InputNumber>
                  </div>
                </div>
              </div>
              <div v-else>Projekt nemá pridelenú pracovnú skupinu</div>
              <Button
                label="Ulož záznamy"
                icon="pi pi-check"
                class="p-button-success mr-2 p-button-raised"
                @click="handleSubmit"
              /><Toast />
            </div>
            <div v-else>Nebol zvolený projekt</div>
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
      selectedEmployee: null,
      statuses: [
        { status: "Otvorený" },
        { status: "Aktívny" },
        { status: "Uzavretý" },
      ],
      employeeWorkGroups: [],
      inputNumberValues: [],
      employeesToRemove: [],
      additionalEmployees: [],
    };
  },

  mounted() {
    this.getProjectDetails();
    this.getEmployeesDetails();
    this.getAttendancesDetails();
    this.employeeWorkGroupsDetails();
  },

  created() {
    this.inputNumberValues = this.employeeWorkGroups.map(() => 8);
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
      this.employeeWorkGroups = response.data.map((employeeWorkGroup) => ({
        ...employeeWorkGroup,
        employee: {
          ...employeeWorkGroup.employee,
          fullName: `${employeeWorkGroup.employee.name} ${employeeWorkGroup.employee.surname}`,
        },
      }));
    },

    async handleSubmit() {
      if (!this.workDescription) {
        this.$toast.add({
          severity: "warn",
          summary: "Chyba",
          detail: "Pre uloženie záznamov zadaj popis odvedenej práce.",
          life: 2500,
        });
        return;
      }

      // Check if any of the additionalEmployees dropdowns are empty
      if (this.additionalEmployees.some((employee) => !employee.selected)) {
        this.$toast.add({
          severity: "warn",
          summary: "Chyba",
          detail: "Všetky pridané polia zamestnancov musia byť vyplnené.",
          life: 2500,
        });
        return;
      }

      // Check if any of the inputNumberValues are empty or zero
      if (this.inputNumberValues.some((value) => !value || value === 0)) {
        this.$toast.add({
          severity: "warn",
          summary: "Chyba",
          detail:
            "Všetky hodnoty pre odpracované hodiny musia byť vyplnené a väčšie ako nula.",
          life: 2500,
        });
        return;
      }

      // Combine employeeWorkGroups and additionalEmployees into a single array
      const allEmployees = [
        ...this.employeeWorkGroups,
        ...this.additionalEmployees,
      ];

      for (const [index, employee] of allEmployees.entries()) {
        const payload = {
          date: this.date,
          projectId: this.selectedProjectId,
          employeeId: employee.employee
            ? employee.employee.id
            : employee.selected,
          workedHours: employee.hours
            ? employee.hours
            : this.inputNumberValues[index],
          workDescription: this.workDescription,
        };
        console.log("Sending payload:", payload); // log the payload

        // Show success toast
        this.$toast.add({
          severity: "success",
          summary: "Úspech",
          detail: "Záznam bol úspešne uložený.",
          life: 1200,
        });

        // Wait for 1 second before sending the API request
        await new Promise((resolve) => setTimeout(resolve, 600));

        try {
          const response = await Api.post("/attendances", payload);
          console.log(response.data);
        } catch (error) {
          console.error("API call failed:", error);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Reset selectedProjectId, workDescription, and additionalEmployees
      this.selectedProjectId = null;
      this.workDescription = "";
      this.additionalEmployees = [];
    },

    deleteEmployeeFromWorkGroup(index) {
      const employee = this.employeeWorkGroups[index].employee;
      this.employeesToRemove.push(employee.id);
      this.employeeWorkGroups.splice(index, 1);
      this.inputNumberValues.splice(index, 1);
    },

    addEmployee() {
      this.additionalEmployees.push({ selected: null, hours: 8 });
    },

    deleteAdditionalEmployee(index) {
      this.additionalEmployees.splice(index, 1);
    },

    filteredEmployees() {
      if (!this.employeeWorkGroups || !this.employees) {
        return [];
      }

      // Get the ids of the employees that are already shown
      const shownEmployeeIds = this.employeeWorkGroups.map(
        (employeeWorkGroup) => employeeWorkGroup.employee.id
      );

      // Map the employees array to add a disabled property to the shown employees
      const mapped = this.employees.map((employee) => ({
        ...employee,
        disabled:
          shownEmployeeIds.includes(employee.id) ||
          this.additionalEmployees.some(
            (additionalEmployee) => additionalEmployee.selected === employee.id
          ),
      }));

      console.log("additionalEmployees", this.additionalEmployees);
      return mapped;
    },
  },

  watch: {
    employeeWorkGroups: {
      immediate: true,
      handler(newVal) {
        this.inputNumberValues = newVal.map(() => 8);
      },
    },
    selectedProjectId: {
      immediate: true,
      async handler(newVal) {
        this.selectedProject =
          this.projects.find((project) => project.id === newVal) || {};

        if (!newVal) {
          this.additionalEmployees = [];
        } else if (this.selectedProject.defaultWorkGroupId) {
          const response = await Api.get(
            `/employeeWorkGroups?workGroupId=${this.selectedProject.defaultWorkGroupId}`
          );

          this.employeeWorkGroups = response.data.map((employeeWorkGroup) => ({
            ...employeeWorkGroup,
            employee: {
              ...employeeWorkGroup.employee,
              fullName: `${employeeWorkGroup.employee.name} ${employeeWorkGroup.employee.surname}`,
            },
          }));
        } else {
          this.employeeWorkGroups = [];
        }
      },
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
