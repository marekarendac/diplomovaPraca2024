<script>
import Navigation from "./Navigation.vue";

export default {
  components: {
    Navigation,
  },
};
</script>
<template>
  <a-layout>
    <a-layout-sider>
      <p class="logo"><router-link to="/">Portál</router-link></p>
      <Navigation
    /></a-layout-sider>
    <a-layout>
      <a-layout-header style="height: 9vh"></a-layout-header>
      <a-layout style="height: 100vh">
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
  height: 100vh;
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
  text-align: center;
  padding: 1vh;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 35px;
  background-color: #1890ff;
  height: 9vh;
}
</style>
