import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
import Layout from "@/components/Layout.vue";
import Home from "../views/HomeView.vue";
import Vehicles from "../views/Tables/Vehicles.vue";
import Employees from "../views/Tables/Employees.vue";
import Equipment from "../views/Tables/Equipment.vue";
import TotalHours from "../views/Tables/TotalHours.vue";
import Attendance from "../views/Attendance.vue";
import AttendanceReport from "../views/Tables/AttendanceReport.vue";
import Projects from "../views/Tables/Projects.vue";
import Customers from "../views/Tables/Customers.vue";
import WorkGroups from "../views/Tables/WorkGroups.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      beforeEnter: authGuard,
      children: [
        {
          path: "",
          name: "Home",
          component: Home,
        },
        {
          path: "employees",
          name: "Employees",
          component: Employees,
        },
        {
          path: "equipment",
          name: "Equipment",
          component: Equipment,
        },
        {
          path: "vehicles",
          name: "Vehicles",
          component: Vehicles,
        },
        {
          path: "TotalHours",
          name: "TotalHours",
          component: TotalHours,
        },
        {
          path: "attendance",
          name: "Attendance",
          component: Attendance,
        },
        {
          path: "report",
          name: "AttendanceReport",
          component: AttendanceReport,
        },
        {
          path: "projects",
          name: "Projects",
          component: Projects,
        },
        {
          path: "customers",
          name: "Customers",
          component: Customers,
        },
        {
          path: "workGroups",
          name: "WorkGroups",
          component: WorkGroups,
        },
      ],
    },
  ],
});

export default router;
