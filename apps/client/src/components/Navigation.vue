<template>
  <a-menu
    style="height: 100%"
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
    <a-menu-item key="13">
      <template #icon><TeamOutlined /> </template>
      <span
        ><router-link to="/employees"
          ><p class="navText">Zamestnanci</p></router-link
        ></span
      >
    </a-menu-item>
    <a-menu-item key="2">
      <template #icon>
        <CarOutlined />
      </template>
      <span
        ><router-link to="/vehicles"
          ><p class="navText">Vozidlá</p></router-link
        ></span
      >
    </a-menu-item>
    <a-menu-item key="3">
      <template #icon>
        <ToolOutlined />
      </template>
      <span
        ><router-link to="/equipment"
          ><p class="navText">Nástroje</p></router-link
        ></span
      >
    </a-menu-item>
    <a-menu-item key="4">
      <template #icon>
        <ContactsOutlined />
      </template>
      <span
        ><router-link to="/attendance"
          ><p class="navText">Dochádzka</p></router-link
        ></span
      >
    </a-menu-item>
    <a-menu-item key="5">
      <template #icon>
        <AuditOutlined />
      </template>
      <span
        ><router-link to="/report"
          ><p class="navText">Prehľad dochádzky</p></router-link
        ></span
      >
    </a-menu-item>
    <a-menu-item key="6">
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
} from "@ant-design/icons-vue";
import { defineComponent, reactive, toRefs, watch } from "vue";
export default defineComponent({
  components: {
    HomeOutlined,
    TeamOutlined,
    CarOutlined,
    ContactsOutlined,
    ToolOutlined,
    AuditOutlined,
    FieldTimeOutlined,
  },

  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ["1"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"],
    });
    watch(
      () => state.openKeys,
      (_val, oldVal) => {
        state.preOpenKeys = oldVal;
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
