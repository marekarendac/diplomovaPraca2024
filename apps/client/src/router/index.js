import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Table from "../views/TableView.vue";

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
  ],
});

export default router;
