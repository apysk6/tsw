<template>
  <div class="container">
    <h1 class="display-5">Ranking Klasy {{ currentClass.numer }} - {{ currentClass.kat }}</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Numer</th>
          <th>Nazwa</th>
          <th>Kraj</th>
          <th>Suma punktów</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in horses" :key="horse.id">
          <td>{{ horse.numer }}</td>
          <td>{{ horse.nazwa }}</td>
          <td>{{ horse.kraj }}</td>
          <td>{{ horse.sumScore || 0 }}</td>
          <td>
            <button class="btn setScoreButton" @click="horseDetails(horse.id)">Oceń</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";

export default {
  name: "ClassRank",
  mounted() {
    this.$store.dispatch("getHorses");
    this.horses = store.getters.getClassHorses(this.$route.params.id);
    this.currentClass = store.getters.getClassById(this.$route.params.id);
    this.setHorsesScores();
  },
  data() {
    return {
      horses: null,
      currentClass: null
    };
  },
  methods: {
    setHorsesScores: function() {
      Array.from(this.horses).forEach(horse => {
        horse.sumScore = this.getSumPoints(horse);
      });

      this.horses.sort(
        (a, b) => parseFloat(b.sumScore) - parseFloat(a.sumScore)
      );
    },

    getSumPoints: function(horse) {
      let numberOfNotes = store.getters.getNumberOfJudgesInClass(horse.klasa);

      let sum = 0;

      Array.from(horse.wynik.noty).forEach(results => {
        sum += parseFloat(results.ruch);
        sum += parseFloat(results.typ);
        sum += parseFloat(results.glowa);
        sum += parseFloat(results.kloda);
        sum += parseFloat(results.nogi);
      });

      return sum;
    }
  }
};
</script>

<style scoped>
.setScoreButton {
  background-color: #667a9b;
  color: #e6e9ef;
}
</style>