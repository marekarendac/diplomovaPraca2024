import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Table from "../views/TableView.vue";
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
      path: "/table",
      name: "Table",
      component: Table,
    },
    {
      path: "/test",
      name: "Test",
      component: Test,
    },
  ],
});

export default router;
