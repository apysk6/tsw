<template>
  <div class="container">
    <ActionMessage/>
    <table>
      <thead>
        <tr>
          <th>Numer</th>
          <th>Kategoria</th>
          <th>Komisja</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="singleClass in classes" :key="singleClass.id">
          <td>{{ singleClass.numer }}</td>
          <td>{{ singleClass.kat }}</td>
          <td>
            <ul>
              <li
                v-for="judge in singleClass.komisja"
                :key="judge.id"
              >{{ getJudgeById(judge).sedzia }} ({{getJudgeById(judge).kraj}})</li>
            </ul>
          </td>
          <td>
            <b-button
              style="margin-right: 10px;"
              variant="info"
              size="sm"
              @click="classDetails(singleClass.id)"
            >Edytuj</b-button>
            <button class="btn btn-danger btn-sm" @click="removeClass(singleClass.id)">X</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";
import ActionMessage from "@/components/ActionMessage.vue";

export default {
  name: "Classes",
  mounted() {
    this.$store.dispatch("getJudges"), this.$store.dispatch("getClasses");
  },
  computed: mapState(["classes", "judges"]),
  methods: {
    getJudgeById: function(id) {
      return store.getters.getJudgeById(id);
    },

    classDetails: function(classId) {
      this.$router.push({ name: "classDetails", params: { id: classId } });
    },

    removeClass: function(id) {
      this.$store.dispatch("deleteClass", id);
    }
  }
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 75%;
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
