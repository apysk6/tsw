<template>
  <div class="judgeEdit-form">
    <div class="property">
      <label>Sędzia</label>
      <input
        type="text"
        v-model="judge.sedzia"
        class="form-control"
        placeholder="Wprowadź imię i nazwisko sędziego"
      >
    </div>
    <label>Kraj</label>
    <input
      type="text"
      v-model="judge.kraj"
      class="form-control"
      placeholder="Wprowadź kraj sędziego"
    >
    <div v-if="validationMessages.length">
      <b-badge
        variant="danger"
        :key="message"
        v-for="message in validationMessages"
        class="error-badge"
      >{{ message }}</b-badge>
    </div>
    <div class="buttonsPanel">
      <button type="button" class="btn btn-success" variant="success" @click="addJudge()">Dodaj</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";
import axios from "axios";

export default {
  name: "JudgeAdd",
  data() {
    return {
      judge: {
        sedzia: "",
        kraj: ""
      },
      validationMessages: []
    };
  },
  mounted() {},
  computed: mapState(["horses"]),
  components: {},
  methods: {
    addJudge: function() {
      this.validationMessages = [];
      if (this.judge.sedzia && this.judge.kraj) {
        this.$store.dispatch("addJudge", this.judge);
        this.$store.dispatch("getJudges");
        this.$router.push({ name: 'judges' });
      } else {
        if (!this.judge.sedzia) {
          this.validationMessages.push(
            "Imię i nazwisko sędziego jest wymagane!"
          );
        }

        if (!this.judge.kraj) {
          this.validationMessages.push("Kraj sędziego jest wymagany!");
        }
      }
    }
  }
};
</script>

<style scoped>
.judgeEdit-form {
  width: 20%;
  margin-left: 40%;
}

.property {
  margin-bottom: 10px;
}

.buttonsPanel {
  margin-top: 30px;
}
</style>

