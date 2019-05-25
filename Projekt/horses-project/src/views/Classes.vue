<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>Numer</th>
          <th>Kategoria</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="singleClass in classes" :key="singleClass.id">
          <td>{{ singleClass.numer }}</td>
          <td>{{ singleClass.kat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from "../store"

export default {
  name: 'Classes',
  mounted () {
    this.$store.dispatch('getJudges'),
    this.$store.dispatch('getClasses')
  },
  computed: mapState([
    'classes',
    'judges'
  ]),
  methods: {
    findJudgeById: function(id) {
      return store.getters.getJudgeById(id);
    }
  }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 30%;
  margin: 50px auto 0 auto;
}

li {
  list-style: none;
}

tr {
  border-bottom: 1px solid black;
}

th {
    background-color: #dbdaf7;
}

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  text-align: center;
}

td input {
    text-align: center;
}
</style>
