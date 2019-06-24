<template>
  <div class="badges">
    <div class="playingBadge" v-if="statusType === 'success'">
      <b-badge variant="success">{{ statusMessage }}</b-badge>
    </div>
    <div class="classDoneBadge" v-if="statusType === 'danger'">
      <b-badge variant="danger">{{ statusMessage }}</b-badge>
    </div>
    <div class="waitingClass" v-if="statusType === 'warning'">
      <b-badge variant="warning">{{ statusMessage }}</b-badge>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "ClassStatus",
  props: ["classNumber"],
  data() {
    return {
      statusType: null,
      statusMessage: null
    };
  },
  mounted() {
    this.$store.dispatch("getHorses");

    setTimeout(() => {
      this.calculateStatus(this.getClassStatus(this.classNumber));
    }, 100);
  },
  sockets: {
    updateRank: function(data) {
      this.$store.dispatch("getHorses");

      setTimeout(() => {
        this.calculateStatus(this.getClassStatus(this.classNumber));
      }, 100);
    }
  },
  methods: {
    calculateStatus: function(status) {
      console.log(status);
      if (status === 1) {
        this.statusType = "success";
        this.statusMessage = "Rozgrywana";
      } else if (status === 0) {
        this.statusType = "danger";
        this.statusMessage = "Zakończona";
      } else {
        this.statusType = "warning";
        this.statusMessage = "Oczekuje na start";
      }
    },

    getClassStatus: function(classNumber) {
      let classHorses = store.getters.getClassHorses(classNumber);
      let notStarted = true;
      let zeroBehind = false;
      let isPlaying = false;

      if (Array.from(classHorses).length === 0) {
        return null;
      }

      Array.from(classHorses).forEach(horse => {
        Array.from(horse.wynik.noty).forEach(note => {
          if (parseFloat(note.typ) < 0.5) {
            zeroBehind = true;
          } else {
            notStarted = false;

            if (zeroBehind && !notStarted) {
              return 1;
            }
          }

          if (parseFloat(note.glowa) < 0.5) {
            zeroBehind = true;
          } else {
            notStarted = false;
            if (zeroBehind === true && notStarted === false) {
              isPlaying = true;
            }
          }

          if (parseFloat(note.kloda) < 0.5) {
            zeroBehind = true;
          } else {
            notStarted = false;

            if (zeroBehind && !notStarted) {
              isPlaying = true;
            }
          }

          if (parseFloat(note.nogi) < 0.5) {
            zeroBehind = true;
          } else {
            notStarted = false;

            if (zeroBehind && !notStarted) {
              isPlaying = true;
            }
          }

          if (parseFloat(note.ruch) < 0.5) {
            zeroBehind = true;
          } else {
            notStarted = false;

            if (zeroBehind && !notStarted) {
              isPlaying = true;
            }
          }
        });
      });

      if (isPlaying) return 1;

      if (!zeroBehind && notStarted) {
        return 1;
      }

      if (!zeroBehind && !notStarted) {
        return 0;
      }

      if (notStarted) {
        return null;
      }
    }
  }
};
</script>
