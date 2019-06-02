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

    ADD_CLASS(state, singleClass) {
      state.classes.push(singleClass);
    },

    DELETE_CLASS(state, id) {
      let index = state.classes.findIndex(singleClass => singleClass.id === id);
      state.classes.splice(index, 1);
    },

    DELETE_HORSE(state, id) {
      let index = state.horses.findIndex(horse => horse.id === id);
      state.horses.splice(index, 1);
    },

    UPDATE_CLASS(state, updatingClass) {
      let storedClass = state.classes.find(
        storedClass => storedClass.id === updatingClass.id
      );
      storedClass.numer = updatingClass.numer;
      storedClass.kat = updatingClass.kat;
      storedClass.komisja = updatingClass.komisja;
    },

    ADD_HORSE(state, horse) {
      state.horses.push(horse);
    },

    UPDATE_HORSE(state, updatingHorse) {
      let storedHorse = state.horses.find(
        storedHorse => storedHorse.id === updatingHorse.id
      );

      storedHorse.numer = updatingHorse.numer;
      storedHorse.klasa = updatingHorse.klasa;
      storedHorse.nazwa = updatingHorse.nazwa;
      storedHorse.kraj = updatingHorse.kraj;
      storedHorse.rocznik = updatingHorse.rocznik;
      storedHorse.masc = updatingHorse.masc;
      storedHorse.plec = updatingHorse.plec;
      storedHorse.hodowca = updatingHorse.hodowca;
      storedHorse.wlasciciel = updatingHorse.wlasciciel;
      storedHorse.rodowod = updatingHorse.rodowod;
      storedHorse.noty = updatingHorse.noty;
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

    addClass({ commit }, singleClass) {
      let errorOccured = false;
      axios
        .post("http://localhost:3000/klasy", {
          numer: singleClass.numer,
          kat: singleClass.kat,
          komisja: singleClass.komisja
        })
        .then(() => {
          commit("ADD_CLASS", singleClass);
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Klasa została pomyślnie dodana.");
      }
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
    },

    updateHorse({ commit }, horse) {
      let errorOccured = false;
      axios
        .put("http://localhost:3000/konie/" + horse.id, {
          numer: horse.numer,
          klasa: horse.klasa,
          nazwa: horse.nazwa,
          kraj: horse.kraj,
          rocznik: horse.rocznik,
          masc: horse.masc,
          plec: horse.plec,
          hodowca: horse.hodowca,
          wlasciciel: horse.wlasciciel,
          rodowod: horse.rodowod,
          wynik: {
            noty: horse.wynik.noty
          }
        })
        .then(() => {
          commit("UPDATE_HORSE", horse);
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Koń został pomyślnie edytowany.");
      }
    },

    addHorse({ commit }, horse) {
      let errorOccured = false;
      axios
        .post("http://localhost:3000/konie", {
          numer: parseInt(horse.numer),
          klasa: parseInt(horse.klasa),
          nazwa: horse.nazwa,
          kraj: horse.kraj,
          rocznik: parseInt(horse.rocznik),
          masc: horse.masc,
          plec: horse.plec,
          hodowca: horse.hodowca,
          wlasciciel: horse.wlasciciel,
          rodowod: horse.rodowod,
          wynik: {
            noty: horse.wynik.noty
          }
        })
        .then(() => {
          commit("ADD_HORSE", horse);
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Koń został pomyślnie dodany.");
      }
    },

    deleteHorse({ commit }, id) {
      let errorOccured = false;
      axios
        .delete("http://localhost:3000/konie/" + id)
        .then(() => {
          commit("DELETE_HORSE", id);
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Koń został pomyślnie usunięty.");
      }
    }
  },

  getters: {
    getJudgeById: state => id => {
      return state.judges.find(judge => judge.id === id);
    },

    getJudges: state => () => {
      return state.judges;
    },

    getClassById: state => id => {
      return state.classes.find(singleClass => singleClass.id === id);
    },

    getHighestClassNumber: state => () => {
      let id =
        Math.max.apply(
          Math,
          Array.from(state.classes).map(function (o) {
            return o.numer;
          })
        ) + 1;

      if (isFinite(id)) return id;
      else return 1;
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
    },

    getHorseById: state => id => {
      return state.horses.find(horse => horse.id === id);
    },

    getNumberOfJudgesInClass: state => classNumber => {
      return Array.from(state.classes.find(singleClass => parseInt(singleClass.numer) === parseInt(classNumber)).komisja).length;
    },

    getClassHorses: state => classNumber => {
      return state.horses.filter(horse => parseInt(horse.klasa) === parseInt(classNumber));
    }
  }
});
