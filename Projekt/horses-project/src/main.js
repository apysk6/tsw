import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import VueSocketIO from "vue-socket.io";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://192.168.0.13:3000"
  })
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
