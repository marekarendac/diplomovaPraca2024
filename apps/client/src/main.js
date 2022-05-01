import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";
import PrimeFlex from "/node_modules/primeflex/primeflex.css";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Calendar from "primevue/calendar";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(Antd);
app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component("Calendar", Calendar);

app.component("Dialog", Dialog);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Toolbar", Toolbar);
app.component("Button", Button);
app.component("FileUpload", FileUpload);
app.component("PrimeFlex", PrimeFlex);
app.component("InputText", InputText);
app.component("Textarea", Textarea);
app.component("InputNumber", InputNumber);
app.component("Toast", Toast);

app.mount("#app");
