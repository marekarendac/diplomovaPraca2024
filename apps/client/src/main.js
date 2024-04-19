import { createApp } from "vue";
import { createPinia } from "pinia";
import { createAuth0 } from "@auth0/auth0-vue";

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
import PrimeFlex from "primeflex/primeflex.css";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import AutoComplete from "primevue/autocomplete";
import Tag from "primevue/tag";
import Card from "primevue/card";
import InputMask from "primevue/inputmask";
import MultiSelect from "primevue/multiselect";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import "primeicons/primeicons.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(Antd);
app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component("Card", Card);
app.component("Tag", Tag);
app.component("AutoComplete", AutoComplete);
app.component("Calendar", Calendar);
app.component("Dropdown", Dropdown);
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
app.component("InputMask", InputMask);
app.component("MultiSelect", MultiSelect);
app.component("Splitter", Splitter);
app.component("SplitterPanel", SplitterPanel);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);

//AUTENTICACION PLUGIN

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
    useRefreshTokens: true,
    cacheLocation: "localstorage",
  })
);

app.mount("#app");
