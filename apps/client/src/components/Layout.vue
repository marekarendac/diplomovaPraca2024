<script>
import Navigation from "./Navigation.vue";

export default {
  components: {
    Navigation,
  },
};
</script>
<template>
  <a-layout style="height: 100vh">
    <a-layout-header style="background-color: #1890ff">
      <router-link class="logo" :to="{ path: '/' }">Ezso</router-link>
    </a-layout-header>

    <a-layout has-sider>
      <a-layout-sider style="height: 100%"> <Navigation /></a-layout-sider>

      <a-layout>
        <a-layout-content><router-view /></a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<style>
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  color: #fff;
  background: #7dbcea;
}
[data-theme="dark"] #components-layout-demo-basic .ant-layout-header {
  background: #6aa0c7;
}
[data-theme="dark"] #components-layout-demo-basic .ant-layout-footer {
  background: #6aa0c7;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  color: #fff;
  line-height: 120px;
  background: #3ba0e9;
}
[data-theme="dark"] #components-layout-demo-basic .ant-layout-sider {
  background: #3499ec;
}
#components-layout-demo-basic .ant-layout-content {
  min-height: 120px;
  color: #fff;
  line-height: 120px;
  background: rgba(16, 142, 233, 1);
}
[data-theme="dark"] #components-layout-demo-basic .ant-layout-content {
  background: #107bcb;
}
#components-layout-demo-basic > .code-box-demo > .ant-layout + .ant-layout {
  margin-top: 48px;
}
.logo {
  color: white;
  text-align: left;

  font-family: Arial, Helvetica, sans-serif;
  font-size: xx-large;
  background-color: #1890ff;
  font-weight: 300;
  transition: none;
}
</style>
