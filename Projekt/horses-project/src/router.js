import Vue from "vue";
import Router from "vue-router";
import Horses from "./views/Horses/Horses.vue";
import Judges from "./views/Judges/Judges.vue";
import Classes from "./views/Classes/Classes.vue";
import ClassDetails from "./views/Classes/ClassDetails.vue";
import ClassAdd from "./views/Classes/ClassAdd.vue";
import ClassRank from "./views/Classes/ClassRank.vue";
import JudgeEdit from "./views/Judges/JudgeEdit.vue";
import JudgeAdd from "./views/Judges/JudgeAdd.vue";
import HorseDetails from "./views/Horses/HorseDetails.vue";
import HorseAdd from "./views/Horses/HorseAdd.vue";

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
      path: "/classes/rank/:id",
      name: "classRank",
      component: ClassRank
    },
    {
      path: "/horses",
      name: "horses",
      component: Horses
    },
    {
      path: "/horses/:id",
      name: "horseDetails",
      component: HorseDetails
    },
    {
      path: "/horses/add",
      name: "addHorse",
      component: HorseAdd
    },
  ]
});
