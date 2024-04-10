<template>
  <a-card hoverable style="width: 40vh">
    <template #cover>
      <img style="padding: 20%" alt="example" src="@/assets/employee.svg" />
    </template>

    <p class="cardTitle">Zamestnanci</p>
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
<style>
.cardTitle {
  text-align: center;
  font-size: 20px;
  font-weight: 100;
}
</style>
