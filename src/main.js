import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "./assets/css/applicationformstyle.css"; //global css for sweetalert2 sa successful submission.

createApp(App).use(router).use(vuetify).mount("#app");
