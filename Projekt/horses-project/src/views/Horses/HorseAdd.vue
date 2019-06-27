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
                        min="1"
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
                      <select class="custom-select" v-model="horse.klasa">
                        <option v-for="singleClass in classes" :key="singleClass.numer" v-bind:value="singleClass.numer">{{singleClass.kat}} ({{singleClass.numer}})</option>
                      </select>
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
                        @click="addHorse()"
                      >Dodaj</button>
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
      <div v-if="validationMessages.length">
        <b-badge
          variant="danger"
          :key="message"
          v-for="message in validationMessages"
          class="error-badge"
        >{{ message }}</b-badge>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";

export default {
  name: "HorseAdd",
  data() {
    return {
      horse: {
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
      availableJudges: []
    };
  },
  mounted() {},
  computed: mapState(["horses", "classes"]),
  components: {},
  methods: {
    addHorse: function() {
      console.log(this.horse.klasa);
      this.validationMessages = [];
      if (this.horse.numer && this.horse.klasa && this.horse.nazwa) {
        this.$store.dispatch("getClasses");
        let numberOfNotes = store.getters.getNumberOfJudgesInClass(
          this.horse.klasa
        );

        for (let i = 0; i < numberOfNotes; i++) {
          let emptyNotes = {
            typ: 0,
            glowa: 0,
            kloda: 0,
            nogi: 0,
            ruch: 0
          };
          this.horse.wynik.noty.push(emptyNotes);
        }

        this.$store.dispatch("addHorse", this.horse).then(() => {
          this.$router.push({ name: "horses" });
        });
      } else {
        if (!this.horse.numer) {
          this.validationMessages.push("Numer startowy konia jest wymagany!");
        }

        if (!this.horse.kat) {
          this.validationMessages.push("Klasa konia jest wymagana!");
        }

        if (!this.horse.nazwa) {
          this.validationMessages.push("Nazwa konia jest wymagana!");
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