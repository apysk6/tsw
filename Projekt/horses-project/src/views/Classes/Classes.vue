<template>
  <div class="container">
    <h1 class="display-5" v-if="isManaging">Klasy</h1>
    <h1 class="display-5" v-if="!isManaging">Panel Kibica</h1>
    <ActionMessage/>
    <table>
      <thead>
        <tr>
          <th>Numer</th>
          <th>Kategoria</th>
          <th>Komisja</th>
          <th>Status</th>
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
            <ClassStatus :classNumber="singleClass.numer"/>
          </td>
          <td>
            <button
              v-if="isManaging"
              class="btn btn-primary btn-space btn-sm"
              @click="classDetails(singleClass.id)"
            >Edytuj</button>
            <button
              class="btn btn-success btn-space btn-sm"
              @click="classRank(singleClass.numer)"
            >Ranking</button>
            <button
              class="btn btn-danger btn-space btn-sm"
              v-if="isManaging"
              @click="removeClass(singleClass.id)"
            >X</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link :to="{ name: 'addClass'}" v-if="isManaging">
      <button type="button" id="addButton" class="btn btn-success" variant="success">Dodaj</button>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";
import ActionMessage from "@/components/ActionMessage.vue";
import ClassStatus from "@/components/ClassStatus.vue";

export default {
  name: "Classes",
  mounted() {
  },
  computed: mapState(["classes", "judges"]),
  props: ["isManaging"],
  components: {
    ActionMessage,
    ClassStatus
  },
  methods: {
    getJudgeById: function(id) {
      return store.getters.getJudgeById(id);
    },

    classDetails: function(classId) {
      this.$router.push({ name: "classDetails", params: { id: classId } });
    },

    classRank: function(classId) {
      console.log(this.isManaging);
      this.$router.push({
        name: "classRank",
        params: { id: classId, isManaging: this.isManaging }
      });
    },

    removeClass: function(id) {
      this.$store.dispatch("deleteClass", id);
      window.scrollTo(0, 0);
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

#addButton {
  margin-left: 69%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.btn-space {
  margin-left: 10px;
}

td input {
  text-align: center;
}
</style>
