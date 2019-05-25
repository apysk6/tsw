<template>
  <div class="container">
    <table class="table table">
      <thead>
        <tr>
          <th>Sędzia</th>
          <th>Kraj</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="judge in judges" :key="judge.id">
          <td>{{ judge.sedzia }}</td>
          <td>{{ judge.kraj }}</td>
          <td class="tableActions">
            <b-button style="margin-right: 10px;" variant="info" size="sm">Edytuj</b-button>
            <b-button variant="danger" size="sm">X</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-success" variant="success">Dodaj</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from "../store"

export default {
  name: 'Judges',
  mounted () {
    this.$store.dispatch('getJudges')
  },
  computed: mapState([
    'judges'
  ])
}
</script>


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
  margin: 50px auto 0 auto;
}

td, th {
  border: 1px solid #ffffff;
  text-align: left;
  padding: 8px;
  text-align: center;
}

td {
  background-color: #fafafa;
}

td input {
    text-align: center;
}
</style>



