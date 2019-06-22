<template>
  <div class="container">
    <ActionMessage/>
    <h1 class="display-5">Konie</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Numer startowy</th>
          <th>Nazwa</th>
          <th>Kraj</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in horses" :key="horse.id">
          <td>{{ horse.numer }}</td>
          <td>{{ horse.nazwa }}</td>
          <td>{{ horse.kraj }}</td>
          <td>
            <button class="btn btn-primary btn-space btn-sm" @click="horseDetails(horse.id)">Edytuj</button>
            <button class="btn btn-danger btn-space btn-sm" @click="deleteHorse(horse.id)">X</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
import ActionMessage from "@/components/ActionMessage.vue";

export default {
  name: "Horses",
  mounted() {
    this.$store.dispatch("getHorses");
  },
  computed: mapState(["horses"]),
  components: { ActionMessage },
  methods: {
    horseDetails: function(horseId) {
      this.$router.push({ name: "horseDetails", params: { id: horseId } });
    },

    deleteHorse: function(horseId) {
      this.$store.dispatch("deleteHorse", horseId);
    }
  }
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 50%;
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

.btn-space {
  margin-left: 10px;
}

td input {
  text-align: center;
}
</style>
