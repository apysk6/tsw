import Vue from "vue";
import Router from "vue-router";
import Horses from "./views/Horses.vue";
import Judges from "./views/Judges/Judges.vue";
import Classes from "./views/Classes/Classes.vue";
import ClassDetails from "./views/Classes/ClassDetails.vue";
import ClassAdd from "./views/Classes/ClassAdd.vue"
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
      path: "/classes/:id",
      name: "classDetails",
      component: ClassDetails
    },
    {
      path: "/classes/add",
      name: "addClass",
      component: ClassAdd
    },
    {
      path: "/horses",
      name: "horses",
      component: Horses
    }
  ]
});
