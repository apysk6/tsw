<template>
  <div class="container">
    <h1 class="display-5">Ranking Klasy</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Numer</th>
          <th>Nazwa</th>
          <th>Kraj</th>
          <th>Suma punktów</th>
          <th v-if="isLogged">Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in horses" :key="horse.id">
          <td v-if="horse.isDraw" style="background: #c14e43">{{ horse.numer}}</td>
          <td v-if="!horse.isDraw" style>{{ horse.numer}}</td>
          <td v-if="horse.isDraw" style="background: #c14e43">{{ horse.nazwa}}</td>
          <td v-if="!horse.isDraw" style>{{ horse.nazwa}}</td>
          <td v-if="horse.isDraw" style="background: #c14e43">{{ horse.kraj }}</td>
          <td v-if="!horse.isDraw" style>{{ horse.kraj}}</td>
          <td v-if="horse.isDraw" style="background: #c14e43">{{ horse.sumScore || 0 }}</td>
          <td v-if="!horse.isDraw" style>{{ horse.sumScore || 0 }}</td>
          <td v-if="isLogged">
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
    setTimeout(() => {
      this.horses = store.getters.getClassHorses(this.$route.params.id);
      this.currentClass = store.getters.getClassById(this.$route.params.id);
      this.setHorsesScores();
    }, 100);
  },
  props: ["isManaging"],
  data() {
    return {
      horses: null,
      currentClass: null,
      isActive: false,
      isLogged: store.getters.getLoggedIn()
    };
  },
  methods: {
    horseDetails: function(horseId) {
      this.$router.push({ name: "horseDetails", params: { id: horseId } });
    },
    setHorsesScores: function() {
      Array.from(this.horses).forEach(horse => {
        horse.sumScore = this.getSumPoints(horse);
        horse.moveSum = this.getSumMoves(horse);
        horse.typesSum = this.getSumTypes(horse);
      });

      this.horses.sort((firstHorse, secondHorse) => {
        if (firstHorse.sumScore < secondHorse.sumScore) return 1;

        if (firstHorse.sumScore > secondHorse.sumScore) return -1;

        if (firstHorse.typesSum < secondHorse.typesSum) return 1;

        if (firstHorse.typesSum > secondHorse.typesSum) return -1;

        if (firstHorse.moveSum < secondHorse.moveSum) return 1;

        if (firstHorse.moveSum > secondHorse.moveSum) return -1;

        if (
          typeof firstHorse.wynik.rozjemca === "undefined" ||
          firstHorse.wynik.rozjemca === null ||
          typeof secondHorse.wynik.rozjemca === "undefined" ||
          secondHorse.wynik.rozjemca === null
        ) {
          this.$store.dispatch("makeHorseDraw", firstHorse);
          this.$store.dispatch("makeHorseDraw", secondHorse);

          firstHorse.isDraw = true;
          secondHorse.isDraw = true;
        } else {
          firstHorse.isDraw = false;
          secondHorse.isDraw = false;
          if (
            parseInt(firstHorse.wynik.rozjemca) <
            parseInt(secondHorse.wynik.rozjemca)
          )
            return -1;

          if (
            parseInt(firstHorse.wynik.rozjemca) >
            parseInt(secondHorse.wynik.rozjemca)
          )
            return 1;
        }
      });
    },

    refreshScores: function() {
      this.$store.dispatch("getHorses");
      setTimeout(() => {
        this.horses = store.getters.getClassHorses(this.$route.params.id);
        this.currentClass = store.getters.getClassById(this.$route.params.id);
        this.setHorsesScores();
      }, 80);
    },

    getSumPoints: function(horse) {
      let sum = 0;

      Array.from(horse.wynik.noty).forEach(results => {
        sum += parseFloat(results.ruch);
        sum += parseFloat(results.typ);
        sum += parseFloat(results.glowa);
        sum += parseFloat(results.kloda);
        sum += parseFloat(results.nogi);
      });

      return parseFloat(sum);
    },

    getSumTypes: function(horse) {
      let typesSum = 0;

      Array.from(horse.wynik.noty).forEach(results => {
        typesSum += parseFloat(results.typ);
      });

      return parseFloat(typesSum);
    },

    getSumMoves: function(horse) {
      let moveSum = 0;

      Array.from(horse.wynik.noty).forEach(results => {
        moveSum += parseFloat(results.ruch);
      });

      return parseFloat(moveSum);
    }
  },
  sockets: {
    updateScores: function(data) {
      this.refreshScores();
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