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
        <input v-model="horse.wynik.noty[index].typ">
      </td>
      <td>
        <input v-model="horse.wynik.noty[index].glowa">
      </td>
      <td>
        <input v-model="horse.wynik.noty[index].kloda">
      </td>
      <td>
        <input v-model="horse.wynik.noty[index].nogi">
      </td>
      <td>
        <input v-model="horse.wynik.noty[index].ruch">
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
  </table>
</template>

<script>
import store from "../store";

export default {
  name: "HorseResultTable",
  components: {},
  props: ["horse"],
  data() {
    return {
      singleClass: null,
      judges: []
    };
  },
  computed: {},
  mounted() {
    this.singleClass = store.getters.getClassById(this.horse.klasa);
    console.log(this.singleClass);
    Array.from(this.singleClass.komisja).forEach(element => {
      let judge = store.getters.getJudgeById(element);
      this.judges.push(judge);
    });
  },
  methods: {
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

        Array.from(this.horse.wynik.noty).forEach((results) => {
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