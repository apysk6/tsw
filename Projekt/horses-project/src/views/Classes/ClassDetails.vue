<template>
  <form class="classForm">
    <div class="col-md">
      <div class="form-group">
        <label class="header">Numer</label>
        <input
          type="number"
          class="form-control"
          placeholder="Wprowadź numer klasy"
          v-model="singleClass.numer"
        >
      </div>
      <div class="form-group">
        <label class="header">Kategoria</label>
        <input
          type="text"
          class="form-control"
          placeholder="Wprowadź kategorię klasy"
          v-model="singleClass.kat"
        >
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label class="header">Komisja</label>
            <b-form-select class="custom-select" v-model="selectedJudges" multiple size="5">
              <option
                v-for="judge in singleClass.komisja"
                :key="judge.id"
              >{{ getJudgeById(judge).sedzia }}</option>
            </b-form-select>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label class="header">Dostępni sędziowie</label>
            <b-form-select
              v-model="selectedAvailableJudges"
              class="custom-select"
              multiple
              size="5"
            >
              <option v-for="judge in availableJudges" :key="judge.id">{{ judge.sedzia }}</option>
            </b-form-select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <button
            type="button"
            class="btn btn-danger"
            variant="success"
            @click="deleteSelectedJudges()"
          >Usuń sędziego</button>
        </div>
        <div class="col-lg-6">
          <button
            type="button"
            class="btn btn-primary"
            variant="success"
            @click="addSelectedJudges()"
          >Dodaj sędziego</button>
        </div>
      </div>
      <div v-if="validationMessages.length" class="validation">
        <b-badge
          variant="danger"
          :key="validationMessage"
          v-for="validationMessage in validationMessages"
          class="error-badge"
        >{{ validationMessage }}</b-badge>
      </div>
      <button
        type="button"
        class="btn modifyButton"
        variant="success"
        @click="updateClass()"
      >Modyfikuj</button>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";

export default {
  name: "ClassDetails",
  data() {
    return {
      singleClass: {
        id: this.$route.params.id,
        numer: "",
        kat: "",
        komisja: []
      },
      validationMessages: [],
      selectedAvailableJudges: [],
      selectedJudges: [],
      availableJudges: []
    };
  },
  mounted() {
    this.singleClass = this.getClassById(this.$route.params.id);
    this.fetchAvailableJudges();
  },
  computed: mapState(["horses"]),
  components: {},
  methods: {
    getClassById: function(id) {
      return store.getters.getClassById(id);
    },

    getJudgeById: function(id) {
      return store.getters.getJudgeById(id);
    },

    fetchAvailableJudges: function() {
      this.availableJudges = store.getters.getUniqueJudges(
        this.singleClass.komisja
      );
    },

    deleteSelectedJudges: function() {
      this.singleClass.komisja.forEach(judge => {
        this.selectedJudges.forEach(selectedJudge => {
          let currentJudge = this.getJudgeById(judge);
          if (this.getJudgeById(judge).sedzia === selectedJudge) {
            this.singleClass.komisja.splice(
              this.singleClass.komisja.findIndex(
                x => this.getJudgeById(x).sedzia === selectedJudge
              ),
              1
            );
          }
        });
      });
      this.fetchAvailableJudges();
    },

    addSelectedJudges: function() {
      let selectedJudges = this.selectedAvailableJudges;
      selectedJudges.forEach(selectedJudge => {
        let judge = store.getters.getJudgeByName(selectedJudge);
        this.singleClass.komisja.push(judge.id);
        this.availableJudges.splice(
          this.availableJudges.findIndex(x => x.sedzia === selectedJudge),
          1
        );
      });
    },

    updateClass: function() {
      this.validationMessages = [];
      if (this.singleClass.numer && this.singleClass.kat) {
        this.$store.dispatch("updateClass", this.singleClass);
        this.$store.dispatch("getClasses");
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
  width: 40%;
  margin: auto;
  border: 1px solid #b1b2b5;
  border-radius: 5px;
  padding: 10px;
}

.header {
  float: left;
  font-weight: bold;
}

.modifyButton {
  margin-top: 30px;
  background-color: #2f3a4c;
  color: #e6e9ef;
}

.validation {
  margin-top: 20px;
}
</style>