<template>
  <div>
    <form class="classForm">
      <div class="col-md-12">
        <div class="form-group">
          <table>
            <tbody>
              <div class="row">
                <div class="col-lg">
                  <a class="sectionTitle">Koń</a>
                  <tr>
                    <td class="headers">Numer</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Wprowadź numer konia"
                        v-model="horse.numer"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Klasa</td>
                  </tr>
                  <tr>
                    <td>
                      <input :disabled="canChangeClass == 1 ? true : false"
                        type="number"
                        class="form-control"
                        placeholder="Wprowadź klasę konia"
                        v-model="horse.klasa"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Nazwa</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź nazwę konia"
                        v-model="horse.nazwa"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Kraj</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź kraj konia"
                        v-model="horse.kraj"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Rocznik</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź rocznik konia"
                        v-model="horse.rocznik"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        type="button"
                        class="btn modifyButton"
                        variant="success"
                        @click="updateHorse()"
                      >Modyfikuj</button>
                    </td>
                  </tr>
                </div>
                <div class="col-lg">
                  <a class="sectionTitle">Hodowca</a>
                  <tr>
                    <td class="headers">Nazwa</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź nazwę hodowcy konia"
                        v-model="horse.hodowca.nazwa"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Kraj</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź kraj hodowcy konia"
                        v-model="horse.hodowca.kraj"
                      >
                    </td>
                  </tr>
                </div>
                <div class="col-lg">
                  <a class="sectionTitle">Właściciel</a>
                  <tr>
                    <td class="headers">Nazwa</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź nazwę właściciela konia"
                        v-model="horse.wlasciciel.nazwa"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Kraj</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź kraj właściciela konia"
                        v-model="horse.wlasciciel.kraj"
                      >
                    </td>
                  </tr>
                </div>
                <div class="col-lg">
                  <a class="sectionTitle">Rodowód</a>
                  <tr>
                    <td class="headers">Ojciec - nazwa</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź nazwę ojca konia"
                        v-model="horse.rodowod.o.nazwa"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Ojciec - kraj</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź kraj ojca konia"
                        v-model="horse.rodowod.o.kraj"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Matka - nazwa</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź nazwę matkę konia"
                        v-model="horse.rodowod.m.nazwa"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Matka - kraj</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź kraj matki konia"
                        v-model="horse.rodowod.m.kraj"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Ojciec matki - nazwa</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź nazwę ojca matki konia"
                        v-model="horse.rodowod.om.nazwa"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="headers">Ojciec matki - kraj</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Wprowadź kraj ojca matki konia"
                        v-model="horse.rodowod.om.kraj"
                      >
                    </td>
                  </tr>
                </div>
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </form>
    <form class="classForm">
      <a class="sectionTitle">Wyniki</a>
      <HorseResultTable v-if="isMounted" :horse="horse"/>
      <button type="button" class="btn modifyButton" variant="success" @click="updateHorse()">Zapisz</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";
import HorseResultTable from "@/components/HorseResultTable.vue";

export default {
  name: "HorseDetails",
  data() {
    return {
      horse: {
        id: this.$route.params.id,
        isDraw: null,
        rozjemca: null,
        numer: "",
        klasa: "",
        nazwa: "",
        kraj: "",
        rocznik: "",
        masc: "",
        plec: "",
        hodowca: {
          nazwa: "",
          kraj: ""
        },
        wlasciciel: {
          nazwa: "",
          kraj: ""
        },
        rodowod: {
          o: {
            nazwa: "",
            kraj: ""
          },
          m: {
            nazwa: "",
            kraj: ""
          },
          om: {
            nazwa: "",
            kraj: ""
          }
        },
        wynik: {
          noty: []
        }
      },
      validationMessages: [],
      selectedAvailableJudges: [],
      selectedJudges: [],
      availableJudges: [],
      isMounted: false,
    };
  },
  mounted() {
    this.horse = store.getters.getHorseById(this.$route.params.id);
    console.log(this.horse);
    this.isMounted = true;
  },
  computed: mapState(["horses", "canChangeClass"]) ,
  components: { HorseResultTable },
  methods: {
    updateHorse: function() {
      this.validationMessages = [];
      if (this.horse.numer && this.horse.klasa) {
        this.$store.dispatch("updateHorse", this.horse);
        this.$router.go(-1);
      } else {
        if (!this.singleClass.numer) {
          this.validationMessages.push("Numer kategorii jest wymagany!");
        }

        if (!this.singleClass.kat) {
          this.validationMessages.push("Nazwa klasy jest wymagana!");
        }
      }
    }
  }
};
</script>

<style scoped>
.classForm {
  margin: auto;
  width: 70%;
  border: 1px solid #b1b2b5;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 50px;
}

.resultForm {
  margin: auto;
  width: 60%;
  border: 1px solid #b1b2b5;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 50px;
}

.headers {
  margin-top: 10px;
  float: left;
  font-weight: bold;
}

.sectionTitle {
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 10px;
  font-size: 22px;
}

.modifyButton {
  background-color: #2f3a4c;
  color: #e6e9ef;
  margin-top: 30px;
  float: left;
}

.buttonsPanel {
  margin-top: 30px;
}

.validation {
  margin-top: 20px;
}
</style>