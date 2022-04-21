import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Vehicles from "../views/TableVehicles.vue";
import Employees from "../views/TableEmployees.vue";
import Equipment from "../views/TableEquipment.vue";
import Test from "../views/testView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //createWebHistory -> aby sme mohli ist krok spat na predoslu pejdzu
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/employees",
      name: "Employees",
      component: Employees,
    },
    {
      path: "/equipment",
      name: "Equipment",
      component: Equipment,
    },
    {
      path: "/vehicles",
      name: "Vehicles",
      component: Vehicles,
    },
    {
      path: "/test",
      name: "Test",
      component: Test,
    },
  ],
});

export default router;
