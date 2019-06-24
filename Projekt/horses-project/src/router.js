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
import ImportData from "./components/ImportData.vue";
import HorseAdd from "./views/Horses/HorseAdd.vue";
import Login from "@/views/Login.vue";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/import",
      name: "import",
      component: ImportData,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/judges",
      name: "judges",
      component: Judges,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/judges/add",
      name: "addJudge",
      component: JudgeAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/judges/edit/:id",
      props: {
        default: true
      },
      name: "editJudge",
      component: JudgeEdit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/classes",
      name: "classes",
      component: Classes,
      props: true,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/classes/:id",
      name: "classDetails",
      component: ClassDetails,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/classes/add",
      name: "addClass",
      component: ClassAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/classes/rank/:id",
      name: "classRank",
      component: ClassRank,
      props: true,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/horses",
      name: "horses",
      component: Horses,

    },
    {
      path: "/horses/:id",
      name: "horseDetails",
      component: HorseDetails,

    },
    {
      path: "/horses/add",
      name: "addHorse",
      component: HorseAdd,

    }
  ]
});

router.beforeEach((to, from, next) => {
  store.state.authStatus.then(loggedIn => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!loggedIn) {
        next({
          name: "login"
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
