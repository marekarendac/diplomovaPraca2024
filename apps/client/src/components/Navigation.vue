<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
  >
    <a-menu-item key="1">
      <template #icon>
        <HomeOutlined />
      </template>
      <span
        ><router-link to="/"><p class="navText">Domov</p></router-link></span
      >
    </a-menu-item>
    <a-menu-item key="2">
      <template #icon><TeamOutlined /> </template>
      <span
        ><router-link to="/employees"
          ><p class="navText">Zamestnanci</p></router-link
        ></span
      >
    </a-menu-item>
    <a-menu-item key="3">
      <template #icon>
        <CarOutlined />
      </template>
      <span
        ><router-link to="/vehicles"
          ><p class="navText">Vozidlá</p></router-link
        ></span
      >
    </a-menu-item>
    <a-menu-item key="4">
      <template #icon>
        <ToolOutlined />
      </template>
      <span
        ><router-link to="/equipment"
          ><p class="navText">Nástroje</p></router-link
        ></span
      >
    </a-menu-item>

    <a-menu-item key="8">
      <template #icon> <UserSwitchOutlined /> </template>
      <span
        ><router-link to="/customers"
          ><p class="navText">Zákazníci</p></router-link
        ></span
      >
    </a-menu-item>

    <a-menu-item key="8">
      <template #icon> <CodepenOutlined /> </template>
      <span
        ><router-link to="/projects"
          ><p class="navText">Projekty</p></router-link
        ></span
      >
    </a-menu-item>

    <a-menu-item key="5">
      <template #icon>
        <ContactsOutlined />
      </template>
      <span
        ><router-link to="/attendance"
          ><p class="navText">Montážny denník</p></router-link
        ></span
      >
    </a-menu-item>
    <a-menu-item key="6">
      <template #icon>
        <AuditOutlined />
      </template>
      <span
        ><router-link to="/report"
          ><p class="navText">Prehľad dochádzky</p></router-link
        ></span
      >
    </a-menu-item>
    <a-menu-item key="7">
      <template #icon> <FieldTimeOutlined /> </template>
      <span
        ><router-link to="/TotalHours"
          ><p class="navText">Odpracované hodiny</p></router-link
        ></span
      >
    </a-menu-item>
  </a-menu>
</template>
<script>
import {
  HomeOutlined,
  TeamOutlined,
  ToolOutlined,
  CarOutlined,
  ContactsOutlined,
  AuditOutlined,
  FieldTimeOutlined,
  CodepenOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    HomeOutlined,
    TeamOutlined,
    CarOutlined,
    ContactsOutlined,
    ToolOutlined,
    AuditOutlined,
    FieldTimeOutlined,
    CodepenOutlined,
    UserSwitchOutlined,
  },

  setup() {
    const route = useRoute();

    const routeKeyMapping = {
      "/": "1",
      "/employees": "2",
      "/vehicles": "3",
      "/equipment": "4",
      "/attendance": "5",
      "/report": "6",
      "/TotalHours": "7",
    };

    const state = reactive({
      collapsed: false,
      selectedKeys: [routeKeyMapping[route.path]], // Set initial selected key based on current route
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"],
    });

    watch(
      () => state.openKeys,
      (_val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    watch(
      () => route.path, // Watch for changes in route
      (newPath) => {
        state.selectedKeys = [routeKeyMapping[newPath]];
      }
    );

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    return { ...toRefs(state), toggleCollapsed };
  },
});
</script>
<style>
.navText {
  text-align: left;
  color: white;
  margin: auto;
}
</style>
