import Vue from "vue";
import Router from "vue-router";
import Horses from "./views/Horses.vue";
import Judges from "./views/Judges.vue";
import Classes from "./views/Classes.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/judges",
      name: "judges",
      component: Judges
    },
    {
      path: "/classes",
      name: "classes",
      component: Classes
    },
    {
      path: "/horses",
      name: "horses",
      component: Horses
    }
  ]
});
