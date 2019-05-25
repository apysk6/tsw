import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    judges: [],
    horses: [],
    classes: []
  },
  mutations: {
    SET_JUDGES(state, judges) {
      state.judges = judges;
    },

    SET_HORSES(state, horses) {
      state.horses = horses;
    },

    SET_CLASSES(state, classes) {
      state.classes = classes;
    }
  },
  actions: {
    getJudges({ commit }) {
      axios
        .get("http://localhost:3000/sedziowie")
        .then(r => r.data)
        .then(judges => {
          commit("SET_JUDGES", judges);
        });
    },

    getHorses({ commit }) {
      axios
        .get("http://localhost:3000/konie")
        .then(r => r.data)
        .then(horses => {
          commit("SET_HORSES", horses);
        });
    },

    getClasses({ commit }) {
      axios
        .get("http://localhost:3000/klasy")
        .then(r => r.data)
        .then(classes => {
          commit("SET_CLASSES", classes);
        });
    }
  },
  getters: {
    getJudgeById: state => id => {
      return state.judges.find(judge => judge.id === id);
    }
  }
});
