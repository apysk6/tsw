import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;

const store = new Vuex.Store({
  state: {
    judges: [],
    horses: [],
    classes: [],
    actionMessage: null,
    canChangeClass: 0,
    loggedIn: false,
    authStatus: new Promise(resolve => {
      setTimeout(() => {
        axios
          .get("http://192.168.0.13:3000/user")
          .then(response => {
            let requestResult = response.data.user ? true : false;
            store.commit("SET_AUTH", requestResult);
            resolve(requestResult);
          })
          .catch(errors => {});
      }, 1000);
    })
  },
  mutations: {
    SET_AUTH(state, loginResult) {
      state.loggedIn = loginResult;
    },

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

      if (state.horses.length > 2) {
        state.horses.sort((a, b) => {
          return a.numer - b.numer;
        });
      }
    },

    SET_CLASSES(state, classes) {
      state.classes = classes;
      if (state.classes.length > 2) {
        state.classes.sort((a, b) => {
          return a.numer - b.numer;
        });
      }
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

    HORSE_DRAW(state, horse) {
      let storedHorse = state.horses.find(
        storedHorse => storedHorse.id === horse.id
      );
      storedHorse.isDraw = true;
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
    },

    SET_CHANGE_CLASS(state, canChange) {
      state.canChangeClass = canChange;
    }
  },
  actions: {
    login({ commit }, user) {
      let errorOccured = false;
      axios
        .post("http://192.168.0.13:3000/login", {
          username: user.login,
          password: user.password
        })
        .then(() => {
          commit("SET_AUTH", true);
        })
        .catch(() => {
          commit("SET_AUTH", false);
          commit("SET_MESSAGE", "Nie udało się zalogować. Spróbuj ponownie!");
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Zostałeś pomyślnie zalogowany!");
      }
    },

    setChangeClassStatus({ commit }, canChange) {
      commit("SET_CHANGE_CLASS", canChange);
    },

    logout({ commit }) {
      axios
        .get("http://192.168.0.13:3000/logout")
        .then(r => r.data)
        .then(() => {
          commit("SET_AUTH", false);
          commit("SET_MESSAGE", "Zostałeś pomyślnie wylogowany!");
        });
    },

    getJudges({ commit }) {
      axios
        .get("http://192.168.0.13:3000/sedziowie")
        .then(r => r.data)
        .then(judges => {
          commit("SET_JUDGES", judges);
        });
    },

    addJudge({ commit }, judge) {
      let errorOccured = false;
      axios
        .post("http://192.168.0.13:3000/sedziowie", {
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

    updateJudge({ commit, dispatch }, judge) {
      let errorOccured = false;
      axios
        .put("http://192.168.0.13:3000/sedziowie/" + judge.id, {
          sedzia: judge.sedzia,
          kraj: judge.kraj
        })
        .then(() => {
          commit("UPDATE_JUDGE", judge);
          dispatch("getJudges");
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
      let judgeInClass = false;

      Array.from(this.state.classes).forEach(singleClass => {
        if (Object.values(singleClass.komisja).indexOf(id) > -1) {
          commit(
            "SET_MESSAGE",
            "Sędzia " +
              this.state.judges.find(judge => judge.id === id).sedzia +
              " sędziuje klasę o numerze " +
              singleClass.numer +
              "! Przed usunięciem zmień skład sędziowski klasy."
          );
          judgeInClass = true;
        }
      });

      if (judgeInClass) return;

      axios
        .delete("http://192.168.0.13:3000/sedziowie/" + id)
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
        .get("http://192.168.0.13:3000/konie")
        .then(r => r.data)
        .then(horses => {
          commit("SET_HORSES", horses);
          return horses;
        });
    },

    makeHorseDraw({ commit }, horse) {
      commit("HORSE_DRAW", horse);
    },

    getClasses({ commit }) {
      axios
        .get("http://192.168.0.13:3000/klasy")
        .then(r => r.data)
        .then(classes => {
          commit("SET_CLASSES", classes);
          return;
        });
    },

    addClass({ commit, dispatch }, singleClass) {
      let errorOccured = false;
      axios
        .post("http://192.168.0.13:3000/klasy", {
          numer: singleClass.numer,
          kat: singleClass.kat,
          komisja: singleClass.komisja
        })
        .then(() => {
          commit("ADD_CLASS", singleClass);
          dispatch("getClasses");
          return;
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
      let horseInClass = false;

      let singleClass = this.state.classes.find(x => x.id === id);

      Array.from(this.state.horses).forEach(horse => {
        if (horse.klasa === singleClass.numer) {
          commit(
            "SET_MESSAGE",
            "Wybrana klasa zawiera przyporządkowane do niej konie. Nie możesz jej usunąć!"
          );
          horseInClass = true;
        }
      });

      if (horseInClass) return;

      axios
        .delete("http://192.168.0.13:3000/klasy/" + id)
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

    updateClass({ commit, dispatch }, singleClass) {
      let errorOccured = false;
      axios
        .put("http://192.168.0.13:3000/klasy/" + singleClass.id, {
          numer: singleClass.numer,
          kat: singleClass.kat,
          komisja: singleClass.komisja
        })
        .then(() => {
          commit("UPDATE_CLASS", singleClass);
          dispatch("getClasses");
          return;
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

    updateHorse({ commit, dispatch }, horse) {
      let errorOccured = false;
      if (typeof horse.wynik.rozjemca !== "undefined") {
        axios
          .put("http://192.168.0.13:3000/konie/" + horse.id, {
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
              rozjemca: parseInt(horse.wynik.rozjemca),
              noty: horse.wynik.noty
            }
          })
          .then(() => {
            commit("UPDATE_HORSE", horse);
            dispatch("getHorses");
          })
          .catch(() => {
            commit(
              "SET_MESSAGE",
              "Nie udało się wykonać żądania. Spróbuj ponownie!"
            );
            errorOccured = true;
          });
      } else {
        axios
          .put("http://192.168.0.13:3000/konie/" + horse.id, {
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
            dispatch("getHorses");
          })
          .catch(() => {
            commit(
              "SET_MESSAGE",
              "Nie udało się wykonać żądania. Spróbuj ponownie!"
            );
            errorOccured = true;
          });
      }

      if (!errorOccured) {
        commit("SET_MESSAGE", "Koń został pomyślnie edytowany.");
      }
    },

    addHorse({ commit, dispatch }, horse) {
      let errorOccured = false;
      axios
        .post("http://192.168.0.13:3000/konie", {
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
          dispatch("getHorses");
          return horse;
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
        .delete("http://192.168.0.13:3000/konie/" + id)
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
    },

    importData({ commit, dispatch }, file) {
      let errorOccured = false;
      axios
        .post("http://192.168.0.13:3000/import/", file)
        .then(() => {
          dispatch("getHorses");
          dispatch("getClasses");
          dispatch("getJudges");
          return;
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Import zakończony pomyślnie.");
      }
    },

    newEvent({ commit, dispatch }) {
      let errorOccured = false;
      axios
        .post("http://192.168.0.13:3000/newEvent/")
        .then(() => {
          dispatch("getHorses");
          dispatch("getClasses");
          dispatch("getJudges");
          return;
        })
        .catch(() => {
          commit(
            "SET_MESSAGE",
            "Nie udało się wykonać żądania. Spróbuj ponownie!"
          );
          errorOccured = true;
        });

      if (!errorOccured) {
        commit("SET_MESSAGE", "Nowy pokaz został utworzony pomyślnie.");
      }
    }
  },

  getters: {
    getLoggedIn: state => () => {
      return state.loggedIn;
    },

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
          Array.from(state.classes).map(function(o) {
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
      return Array.from(
        state.classes.find(
          singleClass => parseInt(singleClass.numer) === parseInt(classNumber)
        ).komisja
      ).length;
    },

    getClassHorses: state => classNumber => {
      return state.horses.filter(
        horse => parseInt(horse.klasa) === parseInt(classNumber)
      );
    },

    getClassByNumber: state => classNumber => {
      return state.classes.find(
        singleClass => singleClass.numer == classNumber
      );
    }
  }
});

export default store;
