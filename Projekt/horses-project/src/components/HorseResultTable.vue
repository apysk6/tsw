<template>
  <table>
    <tr>
      <th>Typ</th>
      <th>Głowa</th>
      <th>Kłoda</th>
      <th>Nogi</th>
      <th>Ruch</th>
      <th>Sędzia</th>
    </tr>
    <tr v-for="(judge, index) in judges" :key="index">
      <td>
        <ScoreInput v-model="horse.wynik.noty[index].typ" :index="1" :horse="horse" @change="resultChanged()"/>
      </td>
      <td>
        <ScoreInput v-model="horse.wynik.noty[index].glowa" :index="2" :horse="horse" @change="resultChanged()"/>
      </td>
      <td>
        <ScoreInput v-model="horse.wynik.noty[index].kloda" :index="3"  :horse="horse"@change="resultChanged()"/>
      </td>
      <td>
        <ScoreInput v-model="horse.wynik.noty[index].nogi" :index="4" :horse="horse" @change="resultChanged()"/>
      </td>
      <td>
        <ScoreInput v-model="horse.wynik.noty[index].ruch" :index="5" :horse="horse" @change="resultChanged()"/>
      </td>
      <td>
        <a>{{ judge.sedzia }} ({{ judge.kraj }})</a>
      </td>
    </tr>
    <tr>
      <a class="sumResult">Suma ruch: {{ getSumMoves() }}</a>
    </tr>
    <tr>
      <a class="sumResult">Suma typ: {{ getSumTypes() }}</a>
    </tr>
    <tr>
      <a class="sumResult">Suma punktów: {{ getSumPoints() }}</a>
    </tr>
    <tr v-if="horse.wynik.rozjemca || horse.isDraw">
      <a class="sumResult">Rozjemca: </a>
      <input v-model="horse.wynik.rozjemca">
    </tr>
  </table>
</template>

<script>
import store from "../store";
import ScoreInput from "./ScoreInput";

export default {
  name: "HorseResultTable",
  components: { ScoreInput },
  props: ["horse"],
  data() {
    return {
      singleClass: null,
      judges: [],
    };
  },
  computed: {},
  mounted() {
    this.singleClass = store.getters.getClassByNumber(this.horse.klasa);
    Array.from(this.singleClass.komisja).forEach(element => {
      let judge = store.getters.getJudgeById(element);
      this.judges.push(judge);
    });

    if (typeof this.horse.isDraw === 'undefined') {
      delete this.horse.wynik.rozjemca;
    }

    if (typeof this.horse.wynik.rozjemca !== 'undefined') {
      this.isDraw = true;
    }
  },
  methods: {
    resultChanged: function() {
      console.log("wchodze");
        delete this.horse.wynik.rozjemca;
        this.horse.isDraw = false;
    },

    getSumTypes: function() {
      let numberOfNotes = store.getters.getNumberOfJudgesInClass(
        this.horse.klasa
      );
      let typesSum = 0;

      for (let i = 0; i < numberOfNotes; i++) {
        typesSum += parseFloat(this.horse.wynik.noty[i].typ);
      }

      return typesSum;
    },

    getSumMoves: function() {
      let numberOfNotes = store.getters.getNumberOfJudgesInClass(
        this.horse.klasa
      );
      let moveSum = 0;

      for (let i = 0; i < numberOfNotes; i++) {
        moveSum += parseFloat(this.horse.wynik.noty[i].ruch);
      }

      return moveSum;
    },

    getSumPoints: function() {
      let numberOfNotes = store.getters.getNumberOfJudgesInClass(
        this.horse.klasa
      );

      let sum = 0;

      Array.from(this.horse.wynik.noty).forEach(results => {
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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  margin: 50px auto 0 auto;
  margin-bottom: 50px;
}

.sumResult {
  width: auto;
  margin-top: 10px;
  font-weight: bold;
  float: left;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  width: 20%;
  text-align: center;
}

td input {
  text-align: center;
  width: 90%;
}
</style>