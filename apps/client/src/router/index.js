import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Vehicles from "../views/Tables/Vehicles.vue";
import Employees from "../views/Tables/Employees.vue";
import Equipment from "../views/Tables/Equipment.vue";
import SignupView from "../views/SignupView.vue";
import Test from "../views/Test.vue";

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
      path: "/Signup",
      name: "Signup",
      component: SignupView,
    },
    {
      path: "/test",
      name: "Test",
      component: Test,
    },
  ],
});

export default router;
