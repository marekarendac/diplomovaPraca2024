<template>
  <div class="card">
    <div
      class="block bg-white font-bold text-left p-2 border-round mb-2 uppercase"
    >
      MONTÁŽNY DENNÍK
    </div>
    <div class="card-container yellow-container">
      <div class="block bg-white font-bold text-center p-1 border-round mb-2">
        <div class="card"></div>
        <div class="block bg-yellow-500 text-center">
          <div class="block bg-white font-bold text-center border-round mb-2">
            <div class="card">
              <div class="flex card-container indigo-container">
                <div
                  class="flex-1 bg-white font-bold border-round p-2 align-items-center text-left"
                >
                  Zodpovedný:<br />
                  <Dropdown
                    v-model="selectedResEmployee"
                    :options="responsibleEmployees"
                    optionLabel="name"
                    placeholder="Zadaj zodpovedného"
                    style="width: 100%"
                  />
                </div>
                <div
                  class="flex-1 bg-white font-bold text-left p-2 border-round"
                >
                  Miesto práce:
                  <Dropdown
                    v-model="selectedPlace"
                    :options="places"
                    optionLabel="placeShort"
                    placeholder="Zadaj miesto práce"
                    style="width: 100%"
                  />
                </div>

                <div
                  class="flex-1 bg-white font-bold text-left p-2 border-round"
                >
                  Dátum:
                  <Calendar
                    showIcon
                    v-model="date"
                    placeholder="Zadaj dátum"
                    style="width: 100%"
                  />
                </div>
              </div>
              <div class="flex card-container indigo-container">
                <div
                  class="flex-1 bg-white font-bold border-round p-2 align-items-center text-left"
                >
                  Objednávateľ: <br />
                  <Dropdown
                    v-model="selectedCustomer"
                    :options="customers"
                    optionLabel="name"
                    placeholder="Zadaj objednávateľa"
                    style="width: 50%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="block bg-white font-bold p-2 border-round mb-2"
        style="width: 100%"
      >
        Popis práce: <br />
        <Textarea v-model="workDescription" rows="2" cols="113" />
      </div>
      <div class="block bg-white font-bold text-left p-2 border-round mb-2">
        PRÁCU VYKONÁVAL:
        <div class="flex card-container indigo-container">
          <div
            class="flex-1 bg-white font-bold border-round align-items-center text-left"
            style="margin-bottom: 5px"
          >
            Zamestnanec:<br />
            <Dropdown
              v-model="selectedEmployee"
              :options="employees"
              optionLabel="name"
              placeholder="Meno zamestnanca"
              style="width: 100%"
            />
          </div>

          <div class="flex-1 bg-white font-bold text-left border-round">
            Počet odpracovaných hodín:<br />
            <InputNumber
              v-model="workHours1"
              showButtons
              buttonLayout="horizontal"
              decrementButtonClass="p-button-danger"
              incrementButtonClass="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              step="0.5"
              style="margin-left: 10px"
            />
          </div>
        </div>
        <div class="block bg-white font-bold text-left border-round">
          <div class="flex card-container indigo-container">
            <div
              class="flex-1 bg-white font-bold border-round align-items-center text-left"
              style="margin-bottom: 5px"
            >
              <Dropdown
                v-model="selectedEmployee1"
                :options="employees"
                optionLabel="name"
                placeholder="Meno zamestnanca"
                style="width: 100%"
              />
            </div>

            <div class="flex-1 bg-white font-bold text-left border-round">
              <InputNumber
                v-model="workHours2"
                showButtons
                buttonLayout="horizontal"
                decrementButtonClass="p-button-danger"
                incrementButtonClass="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                step="0.5"
                style="margin-left: 10px"
              />
            </div>
          </div>
          <div class="block bg-white font-bold text-left border-round">
            <div class="flex card-container indigo-container">
              <div
                class="flex-1 bg-white font-bold border-round align-items-center text-left"
                style="margin-bottom: 5px"
              >
                <Dropdown
                  v-model="selectedEmployee2"
                  :options="employees"
                  optionLabel="name"
                  placeholder="Meno zamestnanca"
                  style="width: 100%"
                />
              </div>

              <div class="flex-1 bg-white font-bold text-left border-round">
                <InputNumber
                  v-model="workHours3"
                  showButtons
                  buttonLayout="horizontal"
                  decrementButtonClass="p-button-danger"
                  incrementButtonClass="p-button-success"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  step="0.5"
                  style="margin-left: 10px"
                />
              </div>
            </div>
            <div class="block bg-white font-bold text-left border-round">
              <div class="flex card-container indigo-container">
                <div
                  class="flex-1 bg-white font-bold border-round align-items-center text-left"
                  style="margin-bottom: 5px"
                >
                  <Dropdown
                    v-model="selectedEmployee3"
                    :options="employees"
                    optionLabel="name"
                    placeholder="Meno zamestnanca"
                    style="width: 100%"
                  />
                </div>

                <div class="flex-1 bg-white font-bold text-left border-round">
                  <InputNumber
                    v-model="workHours4"
                    showButtons
                    buttonLayout="horizontal"
                    decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success"
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus"
                    step="0.5"
                    style="margin-left: 10px"
                  />
                </div>
              </div>
            </div>
            <div class="block bg-white font-bold text-left border-round">
              <div class="flex card-container indigo-container">
                <div
                  class="flex-1 bg-white font-bold border-round align-items-center text-left"
                  style="margin-bottom: 5px"
                >
                  <Dropdown
                    v-model="selectedEmployee4"
                    :options="employees"
                    optionLabel="name"
                    placeholder="Meno zamestnanca"
                    style="width: 100%"
                  />
                </div>

                <div class="flex-1 bg-white font-bold text-left border-round">
                  <InputNumber
                    v-model="workHours5"
                    showButtons
                    buttonLayout="horizontal"
                    decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success"
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus"
                    step="0.5"
                    style="margin-left: 10px"
                  /><Button
                    label="Ulož záznamy"
                    @click="handleClick($event)"
                    style="margin-left: 50px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      selectedEmployee: null,
      selectedEmployee1: null,
      selectedEmployee2: null,
      selectedEmployee3: null,
      selectedEmployee4: null,
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
        this.employees = response.data;
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
          this.responsibleEmployees = response.data;
        }
      );
    },
    async getCustomerDetails() {
      await Api.get("/customers").then((response) => {
        this.customers = response.data;
      });
    },
  },
};
</script>
<style></style>
