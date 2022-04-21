<template>
  <a-card hoverable>
    <template #cover>
      <img style="padding: 50px" alt="example" src="employee.svg" />
    </template>
    <template class="ant-card-actions" #actions>
      <setting-outlined key="setting" />
      <edit-outlined key="edit" />
      <ellipsis-outlined key="ellipsis" />
    </template>
    <a-card-meta title="Zamestnanci" description=""> </a-card-meta>
  </a-card>
</template>
<script>
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
  },
});
</script>
<style></style>
