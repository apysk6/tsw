<template>
  <div class="container">
    <ActionMessage/>
    <table class="table table">
      <thead>
        <tr>
          <th>Sędzia</th>
          <th>Kraj</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="judge in judges" :key="judge.id">
          <td>{{ judge.sedzia }}</td>
          <td>{{ judge.kraj }}</td>
          <td class="tableActions">
            <router-link :to="{ name: 'editJudge', params: { id: judge.id, judge: judge}}">
              <b-button style="margin-right: 10px;" variant="info" size="sm">Edytuj</b-button>
            </router-link>
            <button class="btn btn-danger btn-sm" @click="removeJudge(judge.id)">X</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link :to="{ name: 'addJudge'}">
      <button type="button" id="addButton" class="btn btn-success" variant="success">Dodaj</button>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import store from "@/store";
import ActionMessage from "@/components/ActionMessage.vue"

export default {
  name: "Judges",
  mounted() {
    this.$store.dispatch("getJudges");
  },
    components: {
    ActionMessage
  },
  computed: mapState(["judges"]),
  methods: {
    removeJudge: function(id) {
      this.$store.dispatch("deleteJudge", id);
    }
  }
};
</script>
 
<style>
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

#addButton {
  float: right;
  margin-top: 10px;
}
</style>



