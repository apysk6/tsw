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
      <button
        type="button"
        class="btn modifyButton"
        variant="success"
        @click="updateJudge()"
      >Modyfikuj</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";

export default {
  name: "JudgeEdit",
  data() {
    return {
      judge: {
        id: this.$route.params.id,
        sedzia: "",
        kraj: ""
      },
      validationMessages: []
    };
  },
  mounted() {
    this.judge = this.getJudgeById(this.$route.params.id);
  },
  computed: mapState(["horses"]),
  components: {},
  methods: {
    getJudgeById: function(id) {
      return store.getters.getJudgeById(id);
    },

    updateJudge: function() {
      this.validationMessages = [];
      if (this.judge.sedzia && this.judge.kraj) {
        this.$store.dispatch("updateJudge", this.judge);
        this.$router.go(-1);
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
  margin: auto;
  border: 1px solid #b1b2b5;
  border-radius: 5px;
  padding: 10px;
}

.modifyButton {
  background-color: #2f3a4c;
  color: #e6e9ef;
}

.property {
  margin-bottom: 10px;
}

.buttonsPanel {
  margin-top: 30px;
}
</style>

