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
        <input v-model="horse.wynik.noty[index].typ"/>
      </td>
      <td>
        <input v-model="horse.wynik.noty[index].glowa"/>
      </td>
      <td>
        <input v-model="horse.wynik.noty[index].kloda"/>
      </td>
      <td>
        <input v-model="horse.wynik.noty[index].nogi"/>
      </td>
      <td>
        <input v-model="horse.wynik.noty[index].ruch"/>
      </td>
      <td>
        <a>{{ judge.sedzia }} ({{ judge.kraj }})</a>
      </td>
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
  mounted() {
      this.singleClass = store.getters.getClassById(this.horse.klasa);
      Array.from(this.singleClass.komisja).forEach(element => {
          let judge = store.getters.getJudgeById(element);
          this.judges.push(judge);
      });
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