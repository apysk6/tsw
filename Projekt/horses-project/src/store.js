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
    classes: [],
    actionMessage: null
  },
  mutations: {
    SET_JUDGES(state, judges) {
      state.judges = judges;
    },

    DELETE_JUDGE(state, id) {
      let index = state.judges.findIndex(judge => judge.id === id);
      state.judges.splice(index, 1);
    },

    UPDATE_JUDGE(state, judge) {
      let storedJudge = state.judges.find(
        storedJudge => storedJudge.id === judge.id
      );
      storedJudge.sedzia = judge.sedzia;
      storedJudge.kraj = judge.kraj;
    },

    ADD_JUDGE(state, judge) {
      state.judges.push(judge);
    },

    SET_HORSES(state, horses) {
      state.horses = horses;
    },

    SET_CLASSES(state, classes) {
      state.classes = classes;
    },

    DELETE_CLASS(state, id) {
      let index = state.classes.findIndex(singleClass => singleClass.id === id);
      state.classes.splice(index, 1);
    },

    UPDATE_CLASS(state, updatingClass) {
      let storedClass = state.classes.find(
        storedClass => storedClass.id === updatingClass.id
      );
      storedClass.numer = updatingClass.numer;
      storedClass.kat = updatingClass.kat;
      storedClass.komisja = updatingClass.komisja;
    },

    SET_MESSAGE(state, message) {
      state.actionMessage = message;
      setTimeout(() => {
        state.actionMessage = null;
      }, 3000);
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

    addJudge({ commit }, judge) {
      let errorOccured = false;
      axios
        .post("http://localhost:3000/sedziowie", {
          sedzia: judge.sedzia,
          kraj: judge.kraj
        })
        .then(() => {
          commit("ADD_JUDGE", judge);
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Sędzia został pomyślnie dodany.");
      }
    },

    updateJudge({ commit }, judge) {
      let errorOccured = false;
      axios
        .put("http://localhost:3000/sedziowie/" + judge.id, {
          sedzia: judge.sedzia,
          kraj: judge.kraj
        })
        .then(() => {
          commit("UPDATE_JUDGE", judge);
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Sędzia został pomyślnie edytowany.");
      }
    },

    deleteJudge({ commit }, id) {
      let errorOccured = false;
      axios
        .delete("http://localhost:3000/sedziowie/" + id)
        .then(() => {
          commit("DELETE_JUDGE", id);
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Sędzia został pomyślnie usunięty.");
      }
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
    },

    deleteClass({ commit }, id) {
      let errorOccured = false;
      axios
        .delete("http://localhost:3000/klasy/" + id)
        .then(() => {
          commit("DELETE_CLASS", id);
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Klasa została pomyślnie usunięta.");
      }
    },

    updateClass({ commit }, singleClass) {
      let errorOccured = false;
      axios
        .put("http://localhost:3000/klasy/" + singleClass.id, {
          numer: singleClass.numer,
          kat: singleClass.kat,
          komisja: singleClass.komisja
        })
        .then(() => {
          commit("UPDATE_CLASS", singleClass);
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Klasa została pomyślnie edytowana.");
      }
    }
  },

  getters: {
    getJudgeById: state => id => {
      return state.judges.find(judge => judge.id === id);
    },

    getClassById: state => id => {
      return state.classes.find(singleClass => singleClass.id === id);
    },

    getUniqueJudges: state => judges => {
      let uniqueJudges = [];
      state.judges.forEach(judge => {
        let match = false;
        judges.forEach(classJudge => {
          if (judge.id === classJudge) {
            match = true;
          }
        });

        if (!match) {
          uniqueJudges.push(judge);
        }
      });

      return uniqueJudges;
    },

    getJudgeByName: state => judgeName => {
      return state.judges.find(judge => judge.sedzia === judgeName);
    }
  }
});
