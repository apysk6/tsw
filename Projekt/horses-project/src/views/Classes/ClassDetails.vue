<template>
  <form class="classForm">
    <div class="col-md-12">
      <div class="form-group">
        <label>Numer</label>
        <input
          type="number"
          class="form-control"
          placeholder="Wprowadź numer klasy"
          v-model="singleClass.numer"
        >
      </div>
      <div class="form-group">
        <label for="category">Kategoria</label>
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
            <label>Komisja</label>
            <b-form-select class="custom-select" v-model="selectedJudges" multiple size="5">
              <option
                v-for="judge in singleClass.komisja"
                :key="judge.id"
              >{{ getJudgeById(judge).sedzia }}</option>
            </b-form-select>
          </div>
          <div v-if="validationMessages.length">
            <b-badge
              variant="danger"
              :key="validationMessage"
              v-for="validationMessage in validationMessages"
              class="error-badge"
            >{{ validationMessage }}</b-badge>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Dostępni sędziowie</label>
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
          >Usuń</button>
        </div>
        <div class="col-lg-6">
          <button
            type="button"
            class="btn btn-success"
            variant="success"
            @click="deleteSelectedJudges()"
          >Dodaj</button>
        </div>
      </div>
      <div v-if="validationMessages.length">
        <b-badge
          variant="danger"
          :key="validationMessage"
          v-for="validationMessage in validationMessages"
          class="error-badge"
        >{{ validationMessage }}</b-badge>
      </div>
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
      console.log(this.selectedJudges);
      this.singleClass.komisja.forEach((judge) => {
          this.selectedJudges.forEach((selectedJudge) => {
              let currentJudge = this.getJudgeById(judge);
              if (this.getJudgeById(judge).sedzia === selectedJudge) {
                  this.singleClass.komisja.splice(this.singleClass.komisja.findIndex(x => this.getJudgeById(x).sedzia === selectedJudge), 1);
              }
          });
      });
      this.fetchAvailableJudges();
    }
  }
};
</script>

<style>
.classForm {
  width: 30%;
  margin-left: 35%;
}
</style>