import Vue from "vue";
import Router from "vue-router";
import Horses from "./views/Horses.vue";
import Judges from "./views/Judges/Judges.vue";
import Classes from "./views/Classes.vue";
import JudgeEdit from "./views/Judges/JudgeEdit.vue";
import JudgeAdd from "./views/Judges/JudgeAdd.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/judges",
      name: "judges",
      component: Judges
    },
    {
      path: "/judges/add",
      name: "addJudge",
      component: JudgeAdd
    },
    {
      path: "/judges/edit/:id",
      props: {
        default: true
      },
      name: "editJudge",
      component: JudgeEdit
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
